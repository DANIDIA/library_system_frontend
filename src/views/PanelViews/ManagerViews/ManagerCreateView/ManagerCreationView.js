import React, { useState } from 'react';
import { createUser } from '../../../../apiOperations/usersAPIOperations';
import { roles } from '../../../../shared';
import { userFormValidator } from '../../helpers';
import { employeeStatus } from '../../shared';
import { ManagerFormComponent, managerFormModes } from '../components';
import { getManagerStatusMessage } from '../helpers';

export function ManagerCreationView() {
    const [statusMessage, setStatusMessage] = useState('');

    const handleManagerCreation = async (formData, clearForm) => {
        if (!userFormValidator(formData, setStatusMessage)) return;

        const requestData = {
            ...formData,
            status: employeeStatus.ACTIVE,
            role: roles.DEPARTMENT_MANAGER,
            departmentID: formData.departmentData?.id || null,
        };
        delete requestData.departmentData;

        const response = await createUser(requestData);

        if (!response.ok) {
            setStatusMessage(getManagerStatusMessage(response));
            return;
        }

        setStatusMessage('Successfully created');
        clearForm();
    };

    return (
        <div>
            <ManagerFormComponent
                submitButtonText={'Add manager'}
                formMode={managerFormModes.CREATE}
                formSubmitHandler={handleManagerCreation}
            />
            {statusMessage}
        </div>
    );
}
