import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRoles } from '../enums';
import { newSession } from '../helpers';

export function LoginView() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [authErrorText, setAuthErrorText] = useState('');

    const handleLoginButtonClick = async () => {
        const result = await newSession(login, password);

        if (!result) {
            setAuthErrorText(
                'Oops... Some problems with internet connection or server. Please, check your connection',
            );
        } else if (result.status === 401) {
            setAuthErrorText('Login or password is incorrect');
        } else if (result.status === 403) {
            setAuthErrorText('User is blocked');
        }

        if (result?.userRole === userRoles.ADMIN) {
            navigate('/administrator-panel/');
        } else if (result?.userRole === userRoles.DEPARTMENT_MANAGER) {
            navigate('/department-manager-panel/');
        } else if (result?.userRole === userRoles.LIBRARIAN) {
            navigate('/librarian-panel');
        }
    };

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>Login: </label>
                <input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    type='text'
                />
                <label>Password: </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                />
                <button onClick={handleLoginButtonClick}>Login</button>
            </form>
            {authErrorText}
        </div>
    );
}

export default LoginView;
