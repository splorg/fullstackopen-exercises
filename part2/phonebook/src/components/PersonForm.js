import Header from "./Header"

const PersonForm = ({ title, setPerson, name, setName, number, setNumber }) => {
  return (
    <>
      <Header title={title}/>
      <form onSubmit={setPerson}>
        <div>
          name: <input required value={name} onChange={setName} />
        </div>
        <div>
          number: <input required value={number} onChange={setNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm