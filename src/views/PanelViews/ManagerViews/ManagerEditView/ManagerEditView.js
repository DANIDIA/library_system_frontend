import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { ManagerFormComponent } from '../components';

export function ManagerEditView() {
    const navigate = useNavigate();
    const { userData } = useContext(SessionContext);

    return (
        <div>
            {userData.role === roles.ADMIN ? (
                <ManagerFormComponent submitButtonText='update' />
            ) : (
                'You do not have permission'
            )}
            <button onClick={() => navigate('..')}>back</button>
        </div>
    );
}
