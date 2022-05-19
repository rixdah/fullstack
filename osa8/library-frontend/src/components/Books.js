import { ALL_BOOKS, GET_GENRES, GET_BOOKS_BY_GENRE } from "../queries"
import { useQuery } from "@apollo/client"
import Select from "react-select"
import { useState } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState({value: '', label: ''})
  const result = useQuery(ALL_BOOKS)
  const genres_result = useQuery(GET_GENRES)
  const books_by_genre = useQuery(GET_BOOKS_BY_GENRE, {
    variables: {genre: genre.value}
  })
  if (!props.show) {
    return null
  }
  if (result.loading || genres_result.loading || books_by_genre.loading) {
    return <div>Loading...</div>
  }

  const genres = genres_result.data.allGenres
  const books = genre.value === '' ? result.data.allBooks : books_by_genre.data.allBooks
  const options = genres.map(g => g = {value: g, label: g})

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
          <Select
            value={genre}
            onChange={setGenre}
            options={options}
          />
        </div>
    </div>
  )
}

export default Books
