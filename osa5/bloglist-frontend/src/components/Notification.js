import PropTypes from 'prop-types'

const Notification = ({ message, notificationSeverity }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: notificationSeverity,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style = {notificationStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  notificationSeverity: PropTypes.string.isRequired
}

export default Notification