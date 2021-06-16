import React from 'react'

const FilterByName = (props) => {
    return (
        <>
            <h3>Search by Name: </h3>
            <input 
                value={props.newFilter} 
                onChange={props.handleFilterChange}
            />
        </>
    )
}

export default FilterByName