import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({names, filter}) => {
  const filteredNames = names.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      {filteredNames.map(person => <Part key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

const Part = ({name, number}) => (
  <div>
    <p>
      {name} {number}
    </p>
  </div>
)

const Filter = ({newFilter, handleFormFilterChange}) =>
  <div>Filter shown with <input value={newFilter} onChange={handleFormFilterChange} /></div>

const PersonForm = ({addPerson, newName, newNumber, handleFormNameChange, handleFormNumberChange}) => (
  <form onSubmit={addPerson}>
    <div>Name: <input value={newName} onChange={handleFormNameChange} /></div>
    <div>Number: <input value={newNumber} onChange={handleFormNumberChange} /></div>
    <div><button type="submit">Add</button></div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleFormNameChange = (event) => setNewName(event.target.value)
  const handleFormNumberChange = (event) => setNewNumber(event.target.value)
  const handleFormFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.some(person => person.name === newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFormFilterChange={handleFormFilterChange} />

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
      handleFormNameChange={handleFormNameChange} handleFormNumberChange={handleFormNumberChange} />

      <h2>Numbers</h2>
      <Persons names={persons} filter={newFilter} />
    </div>
  )
}

export default App