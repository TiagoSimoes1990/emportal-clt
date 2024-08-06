/*  request.js
    ============================
    Abstract class for wrapping  Axios HTTP client library.
    
    Required modules:
        axios - simple promise based HTTP client (https://www.npmjs.com/package/axios)

    Created: 08 MAY 2024
    ============================
*/

import axios from "axios";

const config = require('../utils/config');  // Load environment variables from .env file

const axiosClient = axios.create();

// Base URL from environment variable
axiosClient.defaults.baseURL = config.API_BASE_URL;
// Default request timeout
axiosClient.defaults.timeout = 6000;

// axiosClient.defaults.headers = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
// }

// Custom Error Class
class RequestError extends Error {
    constructor(message, response) {
      super(message);
      this.response = response;
    }
  }

// Axios HTTP verbs with error handling
export async function getRequest(URL, headers = {}) {
    try {
        const response = await axiosClient.get(URL, { headers });
        return response.data;
    } catch (error) {
        console.error(`GET request error on ${URL}:`, error);
        throw new RequestError(`Error in GET request on ${URL}`, error.response);
    }
  }

export async function postRequest(URL, payload, headers = { 'Content-Type': 'application/json' }) {
    try {
        const response = await axiosClient.post(URL, payload, { headers });
        return response.data;
    } catch (error) {
        console.error(`POST request error on ${URL}:`, error);
        throw new RequestError(`Error in POST request on ${URL}`, error.response);
    }
  }

export async function patchRequest(URL, payload, headers = { 'Content-Type': 'application/json' }) {
    try {
        const response = await axiosClient.patch(URL, payload, { headers });
        return response.data;
    } catch (error) {
        console.error(`PATCH request error on ${URL}:`, error);
        throw new RequestError(`Error in PATCH request on ${URL}`, error.response);
    }
}

export async function deleteRequest(URL) {
    try {
        const response = await axiosClient.delete(URL);
        return response.data;
    } catch (error) {
        console.error(`DELETE request error on ${URL}:`, error);
        throw new RequestError(`Error in DELETE request on ${URL}`, error.response);
    }
}