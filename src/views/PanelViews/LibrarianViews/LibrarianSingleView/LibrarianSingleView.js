import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { pathsInPanel } from '../../shared';
import { LibrarianContext } from '../LibrarianContext';

export function LibrarianSingleView() {
    const { librarianID } = useParams();
    const { librarianData } = useContext(LibrarianContext);
    const { userData } = useContext(SessionContext);
    const navigate = useNavigate();

    const hasPermissionToRead =
        userData.role === roles.ADMIN ||
        (userData.role === roles.DEPARTMENT_MANAGER &&
            userData.departmentID === librarianData.departmentID);

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
            <button>Delete</button>
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
