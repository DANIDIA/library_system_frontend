import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useOutlet, useParams } from 'react-router-dom';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { departmentPaths } from '../shared';

export function DepartmentSingleView() {
    const navigate = useNavigate();
    const departmentEditOutlet = useOutlet();
    const { departmentID } = useParams();
    const { userData } = useContext(SessionContext);
    const [departmentData, setDepartmentData] = useState();

    const userRole = userData.role;

    const hasReadPermission =
        (userRole !== roles.ADMIN && userData.departmentID === departmentID) ||
        userRole === roles.ADMIN;

    useEffect(() => {
        if (hasReadPermission) {
            setDepartmentData({
                departmentID,
                name: 'test name',
                address: 'test address',
                contactNumber: 'test contactNumber',
            });
        }
    }, []);

    const departmentDetails = (
        <div>
            Department name: {departmentData?.name}
            Department address: {departmentData?.address}
            Department contact number: {departmentData?.contactNumber}
            <div>
                {userRole !== roles.LIBRARIAN && (
                    <button onClick={() => navigate(departmentPaths.UPDATE)}>
                        Update data
                    </button>
                )}
                {userRole === roles.ADMIN && <button>Delete department</button>}
            </div>
        </div>
    );

    return (
        <div>
            {departmentEditOutlet ?? hasReadPermission
                ? departmentDetails
                : "You don't have permission"}
        </div>
    );
}
