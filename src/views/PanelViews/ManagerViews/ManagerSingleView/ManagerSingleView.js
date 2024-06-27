import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { getDepartment } from '../../../../apiOperations';
import {
    deleteUser,
    getUserAuthData,
} from '../../../../apiOperations/managersAPIOperations';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { pathsInPanel } from '../../shared';
import { managerContext } from '../ManagerContext';
import { getManagerStatusMessage } from '../helpers';

export function ManagerSingleView() {
    const navigate = useNavigate();
    const editManagerDataOutlet = useOutlet();
    const { userData } = useContext(SessionContext);
    const { managerData, setManagerData } = useContext(managerContext);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        (async () => {
            if (userData.role !== roles.ADMIN) {
                setStatusMessage("You don't have permission");
                return;
            }

            const authDataResponse = await getUserAuthData(managerData.id);
            const departmentDataResponse = await getDepartment(
                managerData.departmentID,
            );

            if (!authDataResponse.ok) {
                setStatusMessage(getManagerStatusMessage(authDataResponse));
                return;
            }
            if (!departmentDataResponse.ok) {
                setStatusMessage(
                    getManagerStatusMessage(departmentDataResponse),
                );
                return;
            }
            console.log(authDataResponse);
            console.log(departmentDataResponse);
            setManagerData({
                ...managerData,
                ...authDataResponse.data,
                departmentData: departmentDataResponse.data,
            });
        })();
    }, []);

    const handleDelete = async () => {
        const response = await deleteUser(managerData.id);

        if (response.ok) {
            setManagerData(null);
            navigate('..');
        } else {
            setStatusMessage(getManagerStatusMessage(response));
        }
    };

    const managerDetails = (
        <div>
            Name: {managerData.name}
            <br />
            Surname: {managerData.surname}
            <br />
            Phone number: {managerData.phoneNumber}
            <br />
            Email: {managerData.email}
            <br />
            department: {managerData?.departmentData?.name || 'no department'}
            <br />
            Login: {managerData?.login}
            <br />
            Password: {managerData?.password} <br />
            <button onClick={() => navigate(pathsInPanel.UPDATE)}>
                Update
            </button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );

    return (
        <div>
            {editManagerDataOutlet ??
                (userData.role !== roles.ADMIN || managerDetails)}
            {statusMessage}
        </div>
    );
}
