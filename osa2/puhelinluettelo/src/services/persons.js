import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addPerson = personObject => {
    return axios.post(baseUrl, personObject)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, personObject) => {
    return axios.put(`${baseUrl}/${id}`, personObject)
}

export default { getAll, addPerson, deletePerson, updatePerson }