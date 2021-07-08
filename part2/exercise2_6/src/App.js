import './App.css';
import React, { useState, useEffect } from 'react'
// import Person from './components/Person'
// import Numbers from './components/Numbers'
import AddANew from './components/AddANew'
import FilterByName from './components/FilterByName'
// import axios from 'axios'
import personService from './services/persons'
import Person from './components/Person'
import Notification from './components/Notification'


const App = () => {
  const [ allPersons, setAllPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const [ filteredPersons, setFilteredPersons ] = useState(allPersons)  

  const hook = () => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      setAllPersons(initialPersons)
      setFilteredPersons(initialPersons)
    })
    .catch(error => {
      console.log('Error: ', error)
    })
  }
  useEffect(hook, [])
  console.log('render', allPersons.length, 'persons')

  const [ addPersonMessage, setAddPersonMessage ] = useState({ notiClass: 'noNoti', content: '' })
  // const [ addPersonMessage, setAddPersonMessage ] = useState('')
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }

    // if(persons.some(person => person.name === personObject.name)){
    //   alert( `${personObject.name} is already added to phonebook.`);
    // } else {
    //   setPersons(persons.concat(personObject))
    // }
    // setNewName('')
    // setNewNumber('')
    if (allPersons.some(person => person.name === personObject.name)) {
      let personToReplace = allPersons.find(person => person.name === personObject.name)
      personObject.id = personToReplace.id
      personService.replace(personObject)
      .then(returnedPerson => {
        let newAllPersons = allPersons.map(person => person.id !== returnedPerson.id ? person : returnedPerson)
        setAllPersons(newAllPersons)
        setFilteredPersons(newAllPersons)
        setNewName('')
        setNewNumber('')
        setAddPersonMessage({ notiClass: 'success', content: `The number of ${personObject.name} was updated sucessfully` })
        // setAddPersonMessage(`The number of ${personObject.name} was updated sucessfully`)
        setTimeout(() => {
          setAddPersonMessage({ notiClass: 'noNoti', content: ''})
          // setAddPersonMessage(null)
        }, 3000)
      })
      .catch(error => {
        let newAllPersons = allPersons.filter(person => person.id !== personObject.id)
        setAllPersons(newAllPersons)
        setFilteredPersons(newAllPersons)
        setNewName('')
        setNewNumber('')
        setAddPersonMessage({ notiClass: 'failure', content: `The information of '${personObject.name}' was already removed from the server` })
        // setAddPersonMessage(`The information of '${personObject.name}' was already removed from the server`)
        setTimeout(() => {
          setAddPersonMessage({ notiClass: 'noNoti', content: ''})
          // setAddPersonMessage(null)
        }, 3000)
      })
      
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        let newAllPersons = allPersons.concat(returnedPerson)
        setAllPersons(newAllPersons)
        setFilteredPersons(newAllPersons)
        setNewName('')
        setNewNumber('')
        setAddPersonMessage({ notiClass: 'success', content: `The number of ${personObject.name} was added to the phonebook` })
        // setAddPersonMessage(`The number of ${personObject.name} was added to the phonebook`)
        setTimeout(() => {
          setAddPersonMessage({ notiClass: 'noNoti', content: ''})
          // setAddPersonMessage(null)
        }, 3000)
    })
    }
    
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

    let result = allPersons.filter(
      person => person.name.toLowerCase().includes(filter.toLowerCase()) > 0)

    setFilteredPersons(result)
  }

  const removePersonAt = (personToRemove) => {
    console.log(`remove ${personToRemove.name}`)
    // const id = personToRemove.id
    // const person = allPersons.find(p => p.id === d)

    personService
    .remove(personToRemove)
    .then(
      function() {
        let newAllPersons = allPersons.filter(person => person !== personToRemove)
        setAllPersons(newAllPersons)
        setFilteredPersons(newAllPersons)
        // console.log(newAllPersons)
        // setAllPersons(allPersons.filter(person => person !== personToRemove))
      }
      
    )
    // console.log(allPersons)
    // setFilteredPersons(allPersons)
  }

  
  
  return (
    <div>
      <h2>Phonebook</h2>  
      <Notification notiClass={addPersonMessage.notiClass} content={addPersonMessage.content}/>
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
      <ul>
        {filteredPersons.map(person => 
          <Person
            key={person.id}
            person={person}
            removePerson={() => removePersonAt(person)}
          />
        )}
      </ul>
    </div>
  )
}

export default App
