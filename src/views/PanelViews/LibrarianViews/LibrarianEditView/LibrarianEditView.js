import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { UserFormComponent, userFormModes } from '../../components';
import { LibrarianContext } from '../LibrarianContext';

export function LibrarianEditView() {
    const navigate = useNavigate();
    const { librarianData } = useContext(LibrarianContext);
    const { userData } = useContext(SessionContext);
    const [statusMessage] = useState('');

    const haveEditPermission =
        userData.role === roles.ADMIN ||
        (userData.role === roles.DEPARTMENT_MANAGER &&
            librarianData.departmentID === userData.departmentID);

    return (
        <div>
            {haveEditPermission ? (
                <UserFormComponent
                    submitButtonText='update'
                    formMode={userFormModes.FULL}
                    employeeRole={roles.LIBRARIAN}
                    initialValues={librarianData}
                />
            ) : (
                'You do not have permission'
            )}
            <button onClick={() => navigate('..')}>back</button>
            <br />
            {statusMessage}
        </div>
    );
}
