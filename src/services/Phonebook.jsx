import axios from "axios";
const baseURL = "http://localhost:3001/api/people";

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

const create = (newObj) => {
    const request = axios.post(baseURL, newObj);
    return request.then(response => response.data);
}

const update = (id, newObj) => {
    const request = axios.put(`${baseURL}/${id}`, newObj);
    return request.then(response => response.data);
}

const del = (id) => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then(response => response.data);
}

export default { getAll, create, update, del }