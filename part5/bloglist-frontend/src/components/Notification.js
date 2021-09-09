import React from 'react'
import PropTypes from 'prop-types'

const success = {
    color: 'green',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin: 10
}

const error = {
    color: 'red',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin: 10
}

const Notification = ({ errorMessage, successMessage }) => {
    if (successMessage === null && errorMessage === null) {
        return null //conditional rendering
    } else if (successMessage) {
        return (
            <div id='success' style={success}>
                {successMessage}
            </div>
        )
    } else if (errorMessage) {
        return (
            <div id='error'> style={error}
                {errorMessage}
            </div>
        )
    }
}

Notification.propTypes = {
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string
}

export default Notification