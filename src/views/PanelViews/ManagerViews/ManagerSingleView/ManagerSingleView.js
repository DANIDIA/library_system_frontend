import React, { useContext } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { pathsInPanel } from '../../shared';

export function ManagerSingleView() {
    const navigate = useNavigate();
    const editManagerDataOutlet = useOutlet();
    const { userData } = useContext(SessionContext);

    const managerDetails = (
        <div>
            Name: <br />
            Surname: <br />
            Phone number: <br />
            Email: <br />
            department: <br />
            Login: <br />
            Password: <br />
            <button onClick={() => navigate(pathsInPanel.UPDATE)}>
                Update
            </button>
            <button>Delete</button>
        </div>
    );

    return (
        <div>
            {editManagerDataOutlet ??
                (userData.role === roles.ADMIN
                    ? managerDetails
                    : 'You don not have permission')}
        </div>
    );
}
