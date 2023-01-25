import Header from "./Header"

const Person = ({ person }) => (
  <p>{person.name} - {person.number}</p>
)

const PersonList = ({ title, filter, persons, visiblePersons }) => {
  return (
    <>
      <Header title={title} />
      {filter === '' 
        ? persons.map(person => <Person key={person.id} person={person} />)
        : visiblePersons.map(person => <Person key={person.id} person={person} />)
      }
    </>
  )
}

export default PersonList