import PropTypes from 'prop-types'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => (
  <form onSubmit={handleLogin}>
    <div>
      <TextField
        label={'username'}
        id='username'
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}/>
    </div>
    <div>
      <TextField
        label={'password'}
        id='password'
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}/>
    </div>
    <Button
      variant='contained'
      color='primary'
      id='login-button'
      type='submit'>
      Login
    </Button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm