import React, { useState } from 'react';
import { hasEmptyFields } from '../../helpers';
import { ManagerFormComponent, managerFormModes } from '../components';

export function ManagerCreationView() {
    const [statusMessage, setStatusMessage] = useState('');

    const handleManagerCreation = (formData, clearForm) => {
        if (hasEmptyFields(formData)) {
            setStatusMessage('There are empty fields');
            return;
        }

        clearForm();
    };

    return (
        <div>
            <ManagerFormComponent
                submitButtonText={'Add manager'}
                formMode={managerFormModes.WITHOUT_IS_ACTIVE_FIELD}
                formSubmitHandler={handleManagerCreation}
            />
            {statusMessage}
        </div>
    );
}
