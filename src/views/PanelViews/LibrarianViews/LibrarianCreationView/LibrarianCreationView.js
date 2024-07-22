import React, { useState } from 'react';
import { createUser } from '../../../../apiOperations/usersAPIOperations';
import { roles } from '../../../../shared';
import { UserFormComponent, userFormModes } from '../../components';
import { userFormValidator } from '../../helpers';
import { accountStatuses } from '../../shared';
import { getLibrarianStatusMessage } from '../helpers';

export function LibrarianCreationView() {
    const [statusMessage, setStatusMessage] = useState('');

    const handleCreate = async (formData, clearForm) => {
        if (!userFormValidator(formData, setStatusMessage)) return;

        const requestValues = {
            ...formData,
            departmentID: formData?.departmentData?.id || null,
            role: roles.LIBRARIAN,
            status: accountStatuses.ACTIVE,
        };
        delete requestValues.departmentData;

        const response = await createUser(requestValues);

        if (!response.ok) {
            setStatusMessage(getLibrarianStatusMessage(response));
            return;
        }

        clearForm();
        setStatusMessage('Successfully created');
    };

    return (
        <div>
            <UserFormComponent
                submitButtonText='create'
                formMode={userFormModes.CREATE}
                employeeRole={roles.LIBRARIAN}
                formSubmitHandler={handleCreate}
            />
            {statusMessage}
        </div>
    );
}
