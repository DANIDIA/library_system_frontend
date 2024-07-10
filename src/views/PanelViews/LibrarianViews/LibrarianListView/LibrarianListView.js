import React, { useState } from 'react';
import { roles } from '../../../../shared';
import {
    UserFormComponent,
    UserSearchByFlagsComponent,
    userFormModes,
} from '../../components';
import { UsersTable } from '../../components/UsersTable';

export function LibrarianListView() {
    const [searchByFlags, setSearchByFlags] = useState({
        searchByDepartment: true,
        searchByStatus: true,
    });

    return (
        <div>
            <UserFormComponent
                submitButtonText='search managers'
                employeeRole={roles.DEPARTMENT_MANAGER}
                formMode={userFormModes.FULL}
            />
            <UserSearchByFlagsComponent
                initialValues={searchByFlags}
                onChange={setSearchByFlags}
            />
            <UsersTable />
        </div>
    );
}
