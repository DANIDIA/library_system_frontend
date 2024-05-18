import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useOutlet, useParams } from 'react-router-dom';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';

export function DepartmentPageView() {
    const { departmentID } = useParams();
    const { userData } = useContext(SessionContext);
    const [departmentData, setDepartmentData] = useState();
    const navigate = useNavigate();
    const outlet = useOutlet();

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
            {outlet ? (
                outlet
            ) : hasUserPermission ? (
                <div>
                    Department name: {departmentData?.name}
                    Department address: {departmentData?.address}
                    Department contact number: {departmentData?.contactNumber}
                    {userRole === roles.DEPARTMENT_MANAGER ? (
                        <div>
                            <button onClick={() => navigate('update')}>
                                Update data
                            </button>
                        </div>
                    ) : userRole === roles.ADMIN ? (
                        <div>
                            <button onClick={() => navigate('update')}>
                                Update data
                            </button>
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
