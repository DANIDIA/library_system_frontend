import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import {
    deleteDepartment,
    getBooksDetailsInDepartment,
    getEmployeeAmountInDepartment,
} from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { pathsInPanel } from '../../shared';
import { DepartmentContext } from '../DepartmentContext';
import { getDepartmentStatusMessage } from '../helpers';

export function DepartmentSingleView() {
    const navigate = useNavigate();
    const departmentEditOutlet = useOutlet();
    const { userData } = useContext(SessionContext);
    const { departmentData } = useContext(DepartmentContext);
    const [statusMessage, setStatusMessage] = useState();
    const [additionalData, setAdditionalData] = useState({});

    const userRole = userData.role;

    useEffect(() => {
        (async () => {
            const id = departmentData.id;

            const booksAmountDetails = await getBooksDetailsInDepartment(id);

            if (!booksAmountDetails.ok) {
                setStatusMessage(booksAmountDetails.status);
                return;
            }

            if (userRole === roles.LIBRARIAN) {
                setAdditionalData({ ...booksAmountDetails.data });
                return;
            }
            const employeesAmount = await getEmployeeAmountInDepartment(id);

            if (!employeesAmount.ok) {
                setStatusMessage(employeesAmount.status);
                return;
            }

            setAdditionalData({
                ...booksAmountDetails.data,
                ...employeesAmount.data,
            });
        })();
    }, []);

    const hasReadPermission =
        (userRole !== roles.ADMIN &&
            userData.departmentID === departmentData.id) ||
        userRole === roles.ADMIN;

    const handleDelete = async () => {
        const response = await deleteDepartment(departmentData.id);

        if (response.ok) {
            navigate('..');
        } else {
            setStatusMessage(getDepartmentStatusMessage(response.status));
        }
    };

    const departmentDetails = (
        <div>
            Department name: {departmentData?.name} <br />
            Department address: {departmentData?.address} <br />
            Department contact number: {departmentData?.contactNumber} <br />
            Total amount of books: {additionalData.totalBooksAmount} <br />
            Amount of given books: {additionalData.givenBooksAmount} <br />
            {userRole !== roles.LIBRARIAN
                ? 'Amount of employees:' + additionalData.employeesAmount
                : ''}
            <br />
            <div>
                {userRole !== roles.LIBRARIAN && (
                    <button onClick={() => navigate(pathsInPanel.UPDATE)}>
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
