import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleLogin}>
            <div>
                username <input 
                    id='username' 
                    type='text'
                    name='Username' 
                    value={props.username} 
                    onChange={({ target }) => props.setUsername(target.value)}
                />
            </div>
            <div>
                password <input
                    id='password'
                    type='text'
                    name='Password'
                    value={props.password}
                    onChange={({ target }) => props.setPassword(target.value)}
                />
            </div>
            <button id='login-button' type='submit'>
                Login
            </button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm