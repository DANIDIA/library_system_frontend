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
import { LibrarianContext } from '../LibrarianContext';
import { getLibrarianStatusMessage } from '../helpers';

export function LibrarianSingleView() {
    const { librarianID } = useParams();
    const { librarianData, setLibrarianData } = useContext(LibrarianContext);
    const { userData } = useContext(SessionContext);
    const navigate = useNavigate();
    const [statusMessage, setStatusMessage] = useState('');

    const hasPermissionToRead =
        userData.role === roles.ADMIN ||
        (userData.role === roles.DEPARTMENT_MANAGER &&
            userData.departmentID === librarianData.departmentID);

    useEffect(() => {
        (async () => {
            let newUserData = { ...librarianData };

            if (!librarianData) {
                const userDataResponse = getUser(librarianID);

                if (!userDataResponse.ok) {
                    setStatusMessage(
                        getLibrarianStatusMessage(userDataResponse),
                    );
                }

                newUserData = { ...userDataResponse.data };
            }

            const userAuthDataResponse = await getUserAuthData(librarianID);
            const departmentDataResponse = await getDepartment(
                newUserData?.departmentID,
            );

            if (!userAuthDataResponse.ok) {
                setStatusMessage(
                    getLibrarianStatusMessage(userAuthDataResponse),
                );
            }
            if (!departmentDataResponse.ok) {
                setStatusMessage(
                    getLibrarianStatusMessage(departmentDataResponse),
                );
            }

            setLibrarianData({
                ...newUserData,
                ...userAuthDataResponse.data,
                departmentData: departmentDataResponse.data,
            });
        })();
    }, []);

    const handleDelete = async () => {
        const response = await deleteUser(librarianID);

        if (!response.ok) {
            setStatusMessage(getLibrarianStatusMessage(response));
            return;
        }

        setLibrarianData(null);
        navigate(`..`);
    };

    const librarianDetails = (
        <div>
            Name: {librarianData?.name}
            <br />
            Surname: {librarianData?.surname}
            <br />
            Phone number: {librarianData?.phoneNumber}
            <br />
            Email: {librarianData?.email}
            <br />
            department: {librarianData?.departmentData?.name || 'no department'}
            <br />
            Login: {librarianData?.login}
            <br />
            Password: {librarianData?.password}
            <br />
            Status: {librarianData?.status ? 'active' : 'blocked'}
            <br />
            <button
                onClick={() =>
                    navigate(`../${pathsInPanel.UPDATE}/${librarianID}`)
                }
            >
                Update
            </button>
            <button onClick={handleDelete}>Delete</button>
            <br />
            {statusMessage}
        </div>
    );

    return (
        <div>
            {hasPermissionToRead
                ? librarianDetails
                : 'You do not have permission'}
        </div>
    );
}
