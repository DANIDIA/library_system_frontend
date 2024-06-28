import emailValidator from 'email-validator';
import { parsePhoneNumber } from 'libphonenumber-js';
import React, { useState } from 'react';
import { createUser } from '../../../../apiOperations/usersAPIOperations';
import { roles } from '../../../../shared';
import { areNecessaryFieldsEmpty } from '../../helpers';
import { employeeStatus } from '../../shared';
import { ManagerFormComponent, managerFormModes } from '../components';
import { getManagerStatusMessage } from '../helpers';
import { creationNecessaryFields } from '../shared';

export function ManagerCreationView() {
    const [statusMessage, setStatusMessage] = useState('');

    const validate = (formData) => {
        if (areNecessaryFieldsEmpty(formData, creationNecessaryFields)) {
            setStatusMessage('Some of necessary fields are empty fields');
            return false;
        }

        try {
            if (!parsePhoneNumber(formData.phoneNumber, 'PL').isValid()) {
                setStatusMessage('Phone number is incorrect');
                return false;
            }
        } catch {
            setStatusMessage('Phone number is incorrect');
            return false;
        }

        if (!emailValidator.validate(formData.email)) {
            setStatusMessage('Email is incorrect');
            return false;
        }

        return true;
    };

    const handleManagerCreation = async (formData, clearForm) => {
        if (!validate(formData)) return;

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
