import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getUser,
    updateUser,
} from '../../../../apiOperations/usersAPIOperations';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { UserFormComponent, userFormModes } from '../../components';
import { userFormValidator } from '../../helpers';
import { pathsInPanel } from '../../shared';
import { managerContext } from '../ManagerContext';
import { getManagerStatusMessage } from '../helpers';

export function ManagerEditView() {
    const navigate = useNavigate();
    const { managerID } = useParams();
    const { userData } = useContext(SessionContext);
    const { managerData, setManagerData } = useContext(managerContext);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        (async () => {
            if (managerData) return;

            const managerDataResponse = await getUser(managerID);

            if (!managerDataResponse.ok) {
                setStatusMessage(getManagerStatusMessage(managerDataResponse));
            } else {
                setManagerData(...managerDataResponse.data);
            }
        })();
    }, []);

    const handleUpdate = async (formData) => {
        if (!userFormValidator(formData, setStatusMessage)) return;

        const requestData = {
            ...formData,
            departmentID: formData?.departmentData?.id,
        };

        delete requestData.departmentData;

        const response = await updateUser(formData.id, requestData);

        if (!response.ok) {
            setStatusMessage(getManagerStatusMessage(response));
        } else {
            setManagerData(formData);
            navigate(`../${pathsInPanel.PAGE}/${managerID}`);
        }
    };

    return (
        <div>
            {userData.role === roles.ADMIN ? (
                <UserFormComponent
                    submitButtonText='update'
                    formMode={userFormModes.FULL}
                    employeeRole={roles.DEPARTMENT_MANAGER}
                    formSubmitHandler={handleUpdate}
                    initialValues={managerData}
                />
            ) : (
                'You do not have permission'
            )}
            <button
                onClick={() => navigate(`../${pathsInPanel.PAGE}/${managerID}`)}
            >
                back
            </button>
            <br />
            {statusMessage}
        </div>
    );
}
