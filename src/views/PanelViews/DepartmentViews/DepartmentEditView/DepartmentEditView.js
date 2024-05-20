import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { DepartmentFormView } from '../components';

export function DepartmentEditView() {
    const { departmentID } = useParams();
    const { userData } = useContext(SessionContext);
    const [departmentData, setDepartmentData] = useState();

    const userRole = userData.role;

    const hasEditDepartmentPermission =
        (userRole === roles.DEPARTMENT_MANAGER &&
            userData.departmentID === departmentID) ||
        userRole === roles.ADMIN;

    useEffect(() => {
        if (hasEditDepartmentPermission) {
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
            {hasEditDepartmentPermission ? (
                <div>
                    <DepartmentFormView
                        submitButtonText='update'
                        initialValues={departmentData}
                    />
                </div>
            ) : (
                "You don't have permission"
            )}
        </div>
    );
}
