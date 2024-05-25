import React, { useState } from 'react';
import { areNecessaryFieldsEmpty } from '../../helpers';
import { ManagerFormComponent, managerFormModes } from '../components';
import { necessaryFields } from '../shared';

export function ManagerCreationView() {
    const [statusMessage, setStatusMessage] = useState('');

    const handleManagerCreation = (formData, clearForm) => {
        if (areNecessaryFieldsEmpty(formData, necessaryFields)) {
            setStatusMessage('Some of necessary fields are empty fields');
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
