import axios from 'axios'
const baseUrl = '/api/persons'
// const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const replace = newObject => {
    if (window.confirm(`${newObject.name} already exists in phonebook. Proceed to replace?`)) {
        const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
        return request.then(response => response.data)
    }
    
    throw "User changed their mind"
}

const remove = (person) => {
    if (window.confirm(`Delete '${person.name}'?`)) {
        return axios.delete(`${baseUrl}/${person.id}`)
    }

    throw  "User changed their mind"
    // return axios.delete(`${baseUrl}/${person.id}`)
}

export default {getAll, create, replace, remove}