import { GET_FAVORITE_GENRE, GET_BOOKS_BY_GENRE } from "../queries"
import { useQuery } from "@apollo/client"

const Recommendations = (props) => {
  const result = useQuery(GET_FAVORITE_GENRE)
  const favoriteGenre = result.data ? result.data.me.favoriteGenre : ''
  const books = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre }
  })
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: {favoriteGenre}</p>
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommendations