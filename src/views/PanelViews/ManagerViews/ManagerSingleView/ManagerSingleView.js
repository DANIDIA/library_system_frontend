import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDepartment } from '../../../../apiOperations';
import {
    deleteUser,
    getUser,
    getUserAuthData,
} from '../../../../apiOperations/usersAPIOperations';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { pathsInPanel } from '../../shared';
import { managerContext } from '../ManagerContext';
import { getManagerStatusMessage } from '../helpers';

export function ManagerSingleView() {
    const navigate = useNavigate();
    const { managerID } = useParams();
    const { userData } = useContext(SessionContext);
    const { managerData, setManagerData } = useContext(managerContext);
    const [statusMessage, setStatusMessage] = useState('');

    const loadDepartmentAndAuthData = async () => {
        if (userData.role !== roles.ADMIN) {
            setStatusMessage("You don't have permission");
            return;
        }

        let newManagerData = { ...managerData };

        if (!managerData) {
            const managerDataResponse = await getUser(managerID);

            if (!managerDataResponse.ok) {
                setStatusMessage(getManagerStatusMessage(managerDataResponse));
                return;
            }

            newManagerData = { ...managerDataResponse.data };
        }

        const authDataResponse = await getUserAuthData(managerData.id);
        const departmentDataResponse = await getDepartment(
            managerData.departmentID,
        );

        if (!authDataResponse.ok || !departmentDataResponse.ok) {
            setStatusMessage(getManagerStatusMessage(authDataResponse));
            return;
        }

        setManagerData({
            ...newManagerData,
            ...authDataResponse.data,
            departmentData: departmentDataResponse.data,
        });
    };

    useEffect(() => {
        loadDepartmentAndAuthData();
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
            Name: {managerData?.name}
            <br />
            Surname: {managerData?.surname}
            <br />
            Phone number: {managerData?.phoneNumber}
            <br />
            Email: {managerData?.email}
            <br />
            department: {managerData?.departmentData?.name || 'no department'}
            <br />
            Login: {managerData?.login}
            <br />
            Password: {managerData?.password}
            <br />
            Status: {managerData?.status ? 'active' : 'blocked'}
            <br />
            <button
                onClick={() =>
                    navigate(`../${pathsInPanel.UPDATE}/${managerID}`)
                }
            >
                Update
            </button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );

    return (
        <div>
            {userData.role !== roles.ADMIN || managerDetails}
            {statusMessage}
        </div>
    );
}
