import React from 'react';

async function newSession(login, password){
    const SERVER_PATH = 'http://localhost:5000';
    const endPoint = SERVER_PATH + '/sessions/login';

    const response = await (fetch(
        endPoint,
        { method: 'post',
            body: JSON.stringify({ login, password }),
            headers: { 'Content-type': 'application/json'}
        })
        .then(res => {
            if (res.ok)
                return res.json();
            throw res;
        }).then(data => {
            return { status: data.status, sessionID: data.sessionID, userRole: data.role};
        })
        .catch(err => {
            return {status: err.status, massage: err.statusText};
        }));

    return response;
}

export function LoginPage() {

    return (
        <div>
            <form>
                <label>Login: </label><input type='text' name='login' />
                <label>Password: </label><input type='password' name='password'/>
            </form>
            <a href='../librarian/Librarian.js'>Login as librarian</a>
            <a href='../manager/Manager.js'>Login as manager</a>
            <a href='../administrator/Administrator.js'>Login as admin</a>
        </div>
    );
}

export default LoginPage;