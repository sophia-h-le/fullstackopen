import React from 'react'
import Person from './Person'

const Numbers = ({persons}) => {
    return (
      <>
        <h2>Numbers</h2>
        <ul>
            {persons.map(person => 
            <Person key={person.name} person={person} />
            )}
        </ul>
      </>
    )
}

export default Numbers

