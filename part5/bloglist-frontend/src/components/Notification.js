const Notification = ({ notification }) => {
  const { message, type } = notification
  return (
    <div className={type}>
      <p>{message}</p>
    </div>
  )
}

export default Notification
