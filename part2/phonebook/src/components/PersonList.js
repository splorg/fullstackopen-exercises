import Header from "./Header"

const Person = ({ person, onDelete }) => {
  return (
    <>
      <p>{person.name} - {person.number}</p>
      <button onClick={onDelete}>delete</button> 
    </>
  )
}

const PersonList = ({ title, filter, persons, visiblePersons, onDelete }) => {
  return (
    <>
      <Header title={title} />
      {filter === '' 
        ? persons.map(person => <Person key={person.id} person={person} onDelete={() => onDelete(person.id)} />)
        : visiblePersons.map(person => <Person key={person.id} person={person} onDelete={() => onDelete(person.id)} />)
      }
    </>
  )
}

export default PersonList