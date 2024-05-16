import React, { useContext } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { SessionContext } from '../../contexts';
import { roles } from '../../shared';
import { authPath } from '../AuthLayout';
import { panelPaths } from './shared';

export function PanelLayout() {
    const outlet = useOutlet();
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(SessionContext);

    const adminLinks = {
        'department base': panelPaths.DEPARTMENTS_BASE,
        'manager base': panelPaths.MANAGERS_BASE,
        'librarian base': panelPaths.LIBRARIAN_BASE,
        'readers base': panelPaths.READERS_BASE,
        'books base': panelPaths.BOOKS_BASE,
    };

    const managerLinks = {
        'my department': panelPaths.MY_DEPARTMENT,
        'librarian base': panelPaths.LIBRARIAN_BASE,
        'readers base': panelPaths.READERS_BASE,
        'books base': panelPaths.BOOKS_BASE,
    };

    const librarianLinks = {
        'my department': panelPaths.MY_DEPARTMENT,
        'readers base': panelPaths.READERS_BASE,
        'books base': panelPaths.BOOKS_BASE,
    };

    const generateButtons = (links) => {
        return Object.entries(links).map((pair, i) => (
            <button onClick={() => navigate(pair[1])} key={i}>
                {pair[0]}
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
