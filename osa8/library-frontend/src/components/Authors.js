import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import Select from 'react-select'

const Authors = (props) => {
  const [authorName, setAuthorName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>Loading...</div>
  }

  const options = result.data.allAuthors.map(a => a = {value: a.name, label: a.name})

  const submit = async e => {
    e.preventDefault()

    const born = Number(birthyear)
    editAuthor({ variables: { name: authorName.value, setBornTo: born } })

    setAuthorName('')
    setBirthyear('')
  }

  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            value={authorName}
            onChange={setAuthorName}
            options={options}
          />
        </div>
        <div>
          born
          <input value={birthyear} onChange={({ target }) => setBirthyear(target.value)} />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
