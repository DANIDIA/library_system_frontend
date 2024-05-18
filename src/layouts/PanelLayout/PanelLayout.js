import React, { useContext } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { SessionContext } from '../../contexts';
import { roles } from '../../shared';
import { authPath } from '../AuthLayout';
import { basesPaths } from './shared';

export function PanelLayout() {
    const outlet = useOutlet();
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(SessionContext);

    const adminLinks = {
        'department base': basesPaths.DEPARTMENTS_BASE,
        'manager base': basesPaths.MANAGERS_BASE,
        'librarian base': basesPaths.LIBRARIAN_BASE,
        'readers base': basesPaths.READERS_BASE,
        'books base': basesPaths.BOOKS_BASE,
    };

    const managerLinks = {
        'my department': basesPaths.MY_DEPARTMENT,
        'librarian base': basesPaths.LIBRARIAN_BASE,
        'readers base': basesPaths.READERS_BASE,
        'books base': basesPaths.BOOKS_BASE,
    };

    const librarianLinks = {
        'my department': basesPaths.MY_DEPARTMENT,
        'readers base': basesPaths.READERS_BASE,
        'books base': basesPaths.BOOKS_BASE,
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
