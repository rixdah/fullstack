const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/author.js')
const Book = require('./models/book.js')
const User = require('./models/user.js')
require('dotenv').config()
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
      if (args.author && args.genre) {
        const foundAuthor = await Author.findOne({ name: args.author })
        return Book.find({ author: foundAuthor, genres: { $in: [args.genre] } }).populate('author')
      }
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      } else {
        const foundAuthor = await Author.findOne({ name: args.author })
        return Book.find({ author: foundAuthor}).populate('author')
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      console.log(context)
      return context.currentUser
    },
    allGenres: async () => {
      const books = await Book.find({})
      const genres = []
      books.forEach(book => {
        book.genres.forEach(genre => {
          if (!(genres.includes(genre))) {
            genres.push(genre)
          }
        })
      })
      return genres
    }
  },
  Author: {
    bookCount: async ({name}) => {
      const author = await Author.findOne({ name })
      return await Book.collection.count({
        "author": author._id
      })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const foundAuthor = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }
      
      if (!foundAuthor) {
        const author = new Author({ name: args.author, born: null })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        
        const book = new Book({
          title: args.title,
          author: author,
          published: args.published,
          genres: args.genres
        })

        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      }
      const book = new Book({
        title: args.title,
        author: foundAuthor,
        published: args.published,
        genres: args.genres
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      const foundAuthor = await Author.findOne({ name: args.name })
      if (foundAuthor) {
        const changedAuthor = await Author.findByIdAndUpdate(foundAuthor._id, {born: args.setBornTo}, {new: true})
        return changedAuthor
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'correct_password') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        user: user._id
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers