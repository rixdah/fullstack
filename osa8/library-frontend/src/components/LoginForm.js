import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ setToken, setPage, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('userToken', token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()

    await login({ variables: {username, password} })
    setPage('books')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input value={password} type="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm