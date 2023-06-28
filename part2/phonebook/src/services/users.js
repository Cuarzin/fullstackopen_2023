import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const userDelete = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const createUser = (newUser) => {
    return axios.post(baseUrl, newUser)
}

const updateNumber = (id, newNumber) => {
    return axios.put(`${baseUrl}/${id}`, newNumber)
}

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data )
}

//eslint-disable-next-line
export default { userDelete, createUser, updateNumber, getAll}