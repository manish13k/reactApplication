import config from 'config';
import { authHeader } from '../handler';
import { userConstants } from '../../public/constants/index';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', mode: 'no-cors' },
        body: JSON.stringify({"user" : { email, password }})
    };

    return fetch(`${userConstants.BASEAPIURL}/api/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log('useruseruser', user)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    
    const data = {
        "user" : user
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', mode: 'no-cors' },
        body: JSON.stringify(data)
    };
   
    return fetch(`${userConstants.BASEAPIURL}/api/users`, requestOptions).then(handleResponse);   
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log('datadata',data.errors)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            //const error = (data && data.message) || response.statusText;
            const error = Object.keys(data.errors)[0]+ ' '+ Object.values(data.errors)[0][0];
            console.log('errorerror', error);
            return Promise.reject(error);
        }

        return data;
    });
}