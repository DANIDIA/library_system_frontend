import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

//TODO: replace to a separate file
async function newSession(login, password){
    //TODO: replace to constants
    const SERVER_PATH = 'http://localhost:5000';
    const endPoint = SERVER_PATH + '/sessions/login';

    return await (fetch(
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
}

export function LoginPage() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [authErrorText, setAuthErrorText] = useState('');

    const handleLoginButtonClick = async () => {
        const result = await newSession(login, password);

        if (result.status === 401){
            return setAuthErrorText('Login or password is incorrect');
        }else if (result.status === 403){
            return setAuthErrorText('User is blocked');
        }

        setAuthErrorText('');

        // TODO: get rid of magic values
        if(result.userRole === 1){
            navigate('/administrator-panel/');
        }else if(result.userRole === 2){
            navigate('/department-manager-panel/');
        }else if(result.userRole === 3){
            navigate('/librarian-panel');
        }
    };

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>Login: </label><input value={login} onChange={e => setLogin(e.target.value)} type='text' name='login' />
                <label>Password: </label><input value={password} onChange={e => setPassword(e.target.value)} type='password' name='password'/>
                <button onClick={handleLoginButtonClick}>Login</button>
            </form>
            {authErrorText}
        </div>
    );
}

export default LoginPage;
