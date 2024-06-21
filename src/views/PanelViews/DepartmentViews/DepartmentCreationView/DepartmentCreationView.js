import React, { useState } from 'react';
import { createDepartment } from '../../../../apiOperations';
import { hasEmptyFields } from '../../helpers';
import { DepartmentFormComponent } from '../components';
import { getDepartmentStatusMessage } from '../helpers';

export function DepartmentCreationView() {
    const [statusMessage, setStatusMessage] = useState('');

    const validateFormData = (formData) => {
        if (hasEmptyFields(formData)) {
            setStatusMessage('There are empty fields!');
            return false;
        }

        return true;
    };

    const handleDepartmentCreation = async (formData, clearForm) => {
        const isFormDataValid = validateFormData(formData);

        if (!isFormDataValid) return;

        const response = await createDepartment(formData);

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
