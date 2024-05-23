import React, { useContext, useState } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { deleteDepartment } from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { DepartmentContext } from '../DepartmentContext';
import { departmentPaths } from '../shared';

export function DepartmentSingleView() {
    const navigate = useNavigate();
    const departmentEditOutlet = useOutlet();
    const { userData } = useContext(SessionContext);
    const { departmentData } = useContext(DepartmentContext);
    const [statusMessage, setStatusMessage] = useState();

    const userRole = userData.role;

    const hasReadPermission =
        (userRole !== roles.ADMIN &&
            userData.departmentID === departmentData.id) ||
        userRole === roles.ADMIN;

    const handleDelete = async () => {
        const response = await deleteDepartment(
            userData.sessionID,
            departmentData.id,
        );

        if (response.ok) {
            navigate('..');
        } else {
            if (!response.status) {
                setStatusMessage(
                    'Oops... Some problems with internet connection or server. Please, check your connection',
                );
            } else if (response.status === 400) {
                setStatusMessage('There are workers or books in department');
            } else if (response.status === 403) {
                setStatusMessage('Please login again');
            } else if (response.status >= 500) {
                setStatusMessage('Oops... there are problems with server');
            }
        }
    };

    const departmentDetails = (
        <div>
            Department name: {departmentData?.name} <br />
            Department address: {departmentData?.address} <br />
            Department contact number: {departmentData?.contactNumber}
            <br />
            <div>
                {userRole !== roles.LIBRARIAN && (
                    <button onClick={() => navigate(departmentPaths.UPDATE)}>
                        Update data
                    </button>
                )}
                {userRole === roles.ADMIN && (
                    <button onClick={handleDelete}>Delete department</button>
                )}
            </div>
            {statusMessage}
        </div>
    );

    return (
        <div>
            {departmentEditOutlet ??
                (hasReadPermission
                    ? departmentDetails
                    : "You don't have permission")}
        </div>
    );
}
