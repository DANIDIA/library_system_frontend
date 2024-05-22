import React, { useContext, useState } from 'react';
import { createDepartment } from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { DepartmentFormView } from '../components';

export function DepartmentCreationView() {
    const { userData } = useContext(SessionContext);
    const [statusMessage, setStatusMessage] = useState('');

    const handleDepartmentCreation = async (formData) => {
        const response = await createDepartment(userData.sessionID, formData);

        if (!response.ok) {
            if (response.status === 403) {
                setStatusMessage(
                    'Current session is ended. Please login again',
                );
            } else if (response.status === 404) {
                setStatusMessage('Some referencing data was invalid');
            } else if (response.status >= 500) {
                setStatusMessage('Oops.. some problems with server');
            } else if (!response.status) {
                setStatusMessage('Some problems with internet connection');
            }
        } else {
            setStatusMessage('Successfully created');
        }
    };

    return (
        <div>
            <DepartmentFormView
                submitButtonText='create'
                formSubmitHandler={handleDepartmentCreation}
            />
            {statusMessage}
        </div>
    );
}
