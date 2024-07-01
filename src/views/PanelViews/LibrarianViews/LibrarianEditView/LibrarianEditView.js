import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { UserFormComponent, userFormModes } from '../../components';
import { pathsInPanel } from '../../shared';
import { LibrarianContext } from '../LibrarianContext';

export function LibrarianEditView() {
    const navigate = useNavigate();
    const { librarianID } = useParams();
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
            <button
                onClick={() =>
                    navigate(`../${pathsInPanel.PAGE}/${librarianID}`)
                }
            >
                back
            </button>
            <br />
            {statusMessage}
        </div>
    );
}
