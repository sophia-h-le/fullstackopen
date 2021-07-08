import React from 'react'
import Person from './Person'

const Numbers = ({persons, removePerson }) => {
    return (
      <>
        <h2>Numbers</h2>
        <ul>
            {persons.map(person => 
            <Person key={person.name} person={person} removePerson={removePerson}/>
            )}
        </ul>
      </>
    )
}

export default Numbers

