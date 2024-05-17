import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { newSession } from '../../../apiOperations';
import { SessionContext } from '../../../contexts';
import { panelPaths } from '../../../layouts';
import { roles } from '../../../shared';

export function LoginView() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [authErrorText, setAuthErrorText] = useState('');
    const { setUserData } = useContext(SessionContext);

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

        setUserData(result);

        if (result?.role === roles.ADMIN) {
            navigate(panelPaths.USER_PANEL + '/admin-panel');
        } else if (result?.role === roles.DEPARTMENT_MANAGER) {
            navigate(panelPaths.USER_PANEL + '/department-manager-panel/');
        } else if (result?.role === roles.LIBRARIAN) {
            navigate(panelPaths.USER_PANEL + '/librarian-panel');
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
