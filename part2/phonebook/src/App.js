import { useEffect, useState } from 'react'
import axios from 'axios'

import personService from './services/persons'

import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [visiblePersons, setVisiblePersons] = useState(persons)
  const [message, setMessage] = useState({})

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

  const handleMessage = (msg, type) => {
    const messageObject = {
      message: msg,
      type
    }
    
    setMessage(messageObject)

    setTimeout(() => {
      setMessage({})
    }, 3500)
  }

  const addPerson = (e) => {
    e.preventDefault()

    const person = persons.find(person => person.name === newName)

    if (person) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, updatedPerson)
          .then(() => {
            personService
              .getAll()
              .then(newPersonsArray => {
                handleMessage(`${person.name} has been updated`, 'success')
                setPersons(newPersonsArray)
                setNewName('')
                setNewNumber('')
              })
          })
          .catch(error => {
            handleMessage(`${error.response.data.error}`, 'error')
            console.log(error)
            personService
              .getAll()
              .then(newPersonsArray => {
                setPersons(newPersonsArray)
                setNewName('')
                setNewNumber('')
              })
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(newPerson)
        .then(addedPerson => {
          handleMessage(`added ${addedPerson.name}`, 'success')
          personService
            .getAll()
            .then(newPersonsArray => {
              setPersons(newPersonsArray)
              setNewName('')
              setNewNumber('')
            })
        })
        .catch(error => {
          handleMessage(`${error.response.data.error}`, 'error')
          console.log(error)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          handleMessage(`${person.name} has been deleted`, 'success')
          personService
            .getAll()
            .then(newPersonsArray => {
              setPersons(newPersonsArray)
            })
        })
        .catch(error => {
          handleMessage(`${person.name} has already been removed from the server`, 'error')
          console.log(error)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        handleMessage('failed to load contacts', 'error')
        console.log(error)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message.message} type={message.type} />
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
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App