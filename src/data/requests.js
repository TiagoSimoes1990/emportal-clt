/*  request.js
    ============================
    Abstract class for wrapping  Axios HTTP client library.
    
    Required modules:
        axios - simple promise based HTTP client (https://www.npmjs.com/package/axios)

    Created: 08 MAY 2024
    ============================
*/

import axios from "axios";

const axiosClient = axios.create();

// TODO: Replace the BaseURL to get the information from a '.env' file
axiosClient.defaults.baseURL = 'http://localhost:3000/api/';

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}

// Default request timeout
axiosClient.defaults.timeout = 6000;

// Group Axios HTTP verbs like GET, POST, DELETE, and PATCH
export function getRequest(URL, headers = {}) {
    return axiosClient.get(`/${URL}`, headers)
        .then(response => response);
}

export function postRequest(URL, payload, headers = {}) {
    return axiosClient.post(`/${URL}`, payload, headers)
        .then(response => response);
}

export function patchRequest(URL, payload) {
    return axiosClient.patch(`/${URL}`, payload)
        .then(response => response);
}

export function deleteRequest(URL) {
    return axiosClient.delete(`/${URL}`)
        .then(response => response);
}