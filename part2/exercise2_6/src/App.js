import './App.css';
import React, { useState } from 'react'
// import Person from './components/Person'
import Numbers from './components/Numbers'
import AddANew from './components/AddANew'
import FilterByName from './components/FilterByName'


const App = () => {
  const ALL_PERSONS = [
    { name: 'Arto Hellas', number: '0947106' },
    { name: 'Automato', number: '075082'},
    { name: 'Basil Addict', number: '07846520'},
    { name: 'Countess of Cilanto', number: '075q-w3'},
    { name: 'Dustin Thyme', number: 'udh0-45'},
    { name: 'Dillan Bouquet', number: '9752-4-385'}
  ]
  const [ persons, setPersons ] = useState(ALL_PERSONS) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(persons.some(person => person.name === personObject.name)){
      alert( `${personObject.name} is already added to phonebook.`);
    } else {
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const [ newFilter, setNewFilter ] = useState('')
  const handleFilterChange = (event) => {
    let filter = event.target.value
    setNewFilter(filter)
    // console.log(filter)s

    let filteredPersons = ALL_PERSONS.filter(
      person => person.name.toLowerCase().includes(filter.toLowerCase()) > 0)

    setPersons(filteredPersons)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterByName 
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <AddANew 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Numbers persons={persons}/>
    </div>
  )
}

export default App
