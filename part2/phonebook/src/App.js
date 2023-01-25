import { useState } from 'react'

import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [visiblePersons, setVisiblePersons] = useState(persons)

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
    setVisiblePersons(persons.filter(person => (person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)))
  }

  const addPerson = (e) => {
    e.preventDefault()

    if (persons.filter(person => person.name === newName).length) {
      alert(`${newName} is already in the phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    if (persons.filter(person => person.number === newNumber).length) {
      alert(`${newNumber} is already in the phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(newPerson))

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <PersonFilter filter={filter} setFilter={handleFilter} />
      <PersonForm 
        title="add new person" 
        setName={handleNewName} 
        setNumber={handleNewNumber} 
        name={newName} number={newNumber} 
        setPerson={addPerson} 
      />
      <PersonList 
        title="numbers"
        filter={filter}
        persons={persons}
        visiblePersons={visiblePersons}
      />
    </div>
  )
}

export default App