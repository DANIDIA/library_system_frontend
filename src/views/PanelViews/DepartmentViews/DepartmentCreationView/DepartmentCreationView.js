import React, { useContext, useState } from 'react';
import { createDepartment } from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { hasEmptyFields } from '../../helpers';
import { DepartmentFormComponent } from '../components';
import { getDepartmentStatusMessage } from '../helpers';

export function DepartmentCreationView() {
    const { userData } = useContext(SessionContext);
    const [statusMessage, setStatusMessage] = useState('');

    const validateFormData = (formData) => {
        if (hasEmptyFields(formData)) {
            setStatusMessage('There are empty fields!');
        }

        return !hasEmptyFields;
    };

    const handleDepartmentCreation = async (formData, clearForm) => {
        const isFormDataValid = validateFormData(formData);

        if (!isFormDataValid) return;

        const response = await createDepartment(userData.sessionID, formData);

        if (response.ok) {
            setStatusMessage('Successfully created');
            clearForm();
        } else {
            setStatusMessage(getDepartmentStatusMessage(response.status));
        }
    };

    return (
        <div>
            <DepartmentFormComponent
                submitButtonText='create'
                formSubmitHandler={handleDepartmentCreation}
            />
            {statusMessage}
        </div>
    );
}
