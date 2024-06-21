import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startSession } from '../../../apiOperations';
import { SessionContext } from '../../../contexts';
import { layoutsPaths } from '../../../layouts';
import { getLoginStatusMessage } from './getLoginStatusMessage';

export function LoginView() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const { setUserData } = useContext(SessionContext);

    const handleLoginButtonClick = async () => {
        const response = await startSession(login, password);

        if (!response.ok) {
            setStatusMessage(getLoginStatusMessage(response.status));
        } else {
            setUserData(response.data);

            navigate(`/${layoutsPaths.USER_PANEL}`);
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
            {statusMessage}
        </div>
    );
}
