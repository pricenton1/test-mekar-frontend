import axios from "axios";

const BASE_URL = "/users"

const postUser = async function (value, token) {
    let response = await axios.post(
        BASE_URL + '/register',
        value,
        {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const updateUser = async function (id, value, token) {
    let response = await axios.put(
        BASE_URL + '/update/' + id,
        value,
        {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const getUser = async function (keyword="",page=1,limit=5, token) {
    let response = await axios.get(
        `${BASE_URL}?keyword=${keyword}&page=${page * limit - limit}&limit=${limit}`,
        {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        }
    )
    console.log(response.data)
    return response.data
}

const deleteUser = async function (id, token) {
    let response = await axios.delete(
        BASE_URL + '/delete/' + id,
        {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const getJobs = async function (token) {
    let response = await axios.get(
        '/jobs',
        {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const getEducation = async function (token) {
    let response = await axios.get(
        '/educations',
        {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

export {postUser, getUser, updateUser, deleteUser, getJobs, getEducation}