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

    const adminLinks = [
        panelPaths.DEPARTMENTS_BASE,
        panelPaths.MANAGERS_BASE,
        panelPaths.LIBRARIAN_BASE,
        panelPaths.READERS_BASE,
        panelPaths.BOOKS_BASE,
    ];

    const managerLinks = [
        panelPaths.MY_DEPARTMENT,
        panelPaths.LIBRARIAN_BASE,
        panelPaths.READERS_BASE,
        panelPaths.BOOKS_BASE,
    ];

    const librarianLinks = [
        panelPaths.MY_DEPARTMENT,
        panelPaths.READERS_BASE,
        panelPaths.BOOKS_BASE,
    ];

    function generateButtons(links) {
        return links.map((link, i) => (
            <button onClick={() => navigate(link)} key={i}>
                link
            </button>
        ));
    }

    let buttons;

    switch (userData.role) {
        case roles.ADMIN:
            buttons = generateButtons(adminLinks);
            break;
        case roles.DEPARTMENT_MANAGER:
            buttons = generateButtons(managerLinks);
            break;
        case roles.LIBRARIAN:
            buttons = generateButtons(librarianLinks);
            break;
    }

    function logout() {
        navigate(authPath.LOGIN);
        setUserData();
    }

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
