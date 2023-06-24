import PropTypes from 'prop-types'
import Notification from './Notification'

const LoginForm = ({
  notification,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  password,
  username
}) => {
  return (
    <div>
      <h2>login to application</h2>
      {notification && <Notification notification={notification} />}
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-btn' type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  notification: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string
  })
}

export default LoginForm
