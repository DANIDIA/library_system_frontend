import React, { useContext, useState } from 'react';
import { createDepartment } from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { DepartmentFormComponent } from '../components';

export function DepartmentCreationView() {
    const { userData } = useContext(SessionContext);
    const [statusMessageText, setStatusMessageText] = useState('');

    const validateFormData = (formData) => {
        const hasEmptyFields = Object.entries(formData).some(
            (pair) => !pair[1].trim(),
        );

        if (hasEmptyFields) {
            setStatusMessageText('There are empty fields!');
        }

        return !hasEmptyFields;
    };

    const handleDepartmentCreation = async (formData) => {
        const isFormDataValid = validateFormData(formData);

        if (!isFormDataValid) return;

        const response = await createDepartment(userData.sessionID, formData);

        if (!response.ok) {
            if (response.status === 403) {
                setStatusMessageText(
                    'Current session is ended. Please login again',
                );
            } else if (response.status === 404) {
                setStatusMessageText('Some referencing data was invalid');
            } else if (response.status >= 500) {
                setStatusMessageText('Oops.. some problems with server');
            } else if (!response.status) {
                setStatusMessageText('Some problems with internet connection');
            }
        } else {
            setStatusMessageText('Successfully created');
        }
    };

    return (
        <div>
            <DepartmentFormComponent
                submitButtonText='create'
                formSubmitHandler={handleDepartmentCreation}
                clearFormAfterSubmit={true}
            />
            {statusMessageText}
        </div>
    );
}
