import React, { useContext } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { SessionContext } from '../../contexts';
import { roles } from '../../shared';
import { authPath } from '../AuthLayout';
import { adminLinks, librarianLinks, managerLinks } from './shared';

export function PanelLayout() {
    const outlet = useOutlet();
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(SessionContext);

    const generateButtons = (links) => {
        return Object.entries(links).map((pair, i) => (
            <button onClick={() => navigate(pair[0])} key={i}>
                {pair[1]}
            </button>
        ));
    };

    const buttons = generateButtons(
        userData.role === roles.ADMIN
            ? adminLinks
            : userData.role === roles.DEPARTMENT_MANAGER
              ? managerLinks
              : librarianLinks,
    );

    const logout = () => {
        navigate(authPath.LOGIN);
        setUserData();
    };

    return (
        <div>
            <div>
                <button onClick={logout}>logout</button>
            </div>
            <nav>{buttons}</nav>
            {outlet}
        </div>
    );
}
