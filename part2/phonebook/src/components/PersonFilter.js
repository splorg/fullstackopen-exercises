const PersonFilter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={setFilter} />
    </div>
  )
}

export default PersonFilter