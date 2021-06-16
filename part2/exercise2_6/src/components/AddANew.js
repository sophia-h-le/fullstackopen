import React from 'react'

const AddANew = (props) => {
    return (
        <>
            <h3>Add A New</h3>
            <form onSubmit={props.addPerson}>
                <div>
                    name: <input 
                        value={props.newName}
                        onChange={props.handleNameChange}
                    />
                </div>
                <div>
                    number: <input 
                        value={props.newNumber}
                        onChange={props.handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default AddANew