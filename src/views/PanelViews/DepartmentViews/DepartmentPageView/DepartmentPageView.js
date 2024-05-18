import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';

export function DepartmentPageView() {
    const { departmentID } = useParams();
    const { userData } = useContext(SessionContext);
    const [departmentData, setDepartmentData] = useState();

    const userRole = userData.role;

    const hasUserPermission =
        (userRole !== roles.ADMIN && userData.departmentID === departmentID) ||
        userRole === roles.ADMIN;

    useEffect(() => {
        if (hasUserPermission) {
            setDepartmentData({
                departmentID,
                name: 'test name',
                address: 'test address',
                contactNumber: 'test contactNumber',
            });
        }
    }, []);

    return (
        <div>
            {hasUserPermission ? (
                <div>
                    Department name: {departmentData?.name}
                    Department address: {departmentData?.address}
                    Department contact number: {departmentData?.contactNumber}
                    {userRole === roles.DEPARTMENT_MANAGER ? (
                        <div>
                            <button>Update data</button>
                        </div>
                    ) : userRole === roles.ADMIN ? (
                        <div>
                            <button>Update data</button>
                            <button>Delete department</button>
                        </div>
                    ) : undefined}
                </div>
            ) : (
                "You don't have permission"
            )}
        </div>
    );
}
