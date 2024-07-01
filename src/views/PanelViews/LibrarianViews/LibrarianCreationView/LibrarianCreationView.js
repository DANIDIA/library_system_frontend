import React, { useState } from 'react';
import { roles } from '../../../../shared';
import { UserFormComponent, userFormModes } from '../../components';

export function LibrarianCreationView() {
    const [statusMessage] = useState('');

    return (
        <div>
            <UserFormComponent
                submitButtonText='create'
                formMode={userFormModes.CREATE}
                employeeRole={roles.LIBRARIAN}
            />
            {statusMessage}
        </div>
    );
}
