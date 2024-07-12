import React, { useContext, useState } from 'react';
import { queryUsers } from '../../../../apiOperations/usersAPIOperations';
import { roles } from '../../../../shared';
import {
    UserFormComponent,
    UserSearchByFlagsComponent,
    userFormModes,
} from '../../components';
import { UsersTable } from '../../components/UsersTable';
import { getWithoutEmptyFields } from '../../helpers';
import { managerContext } from '../ManagerContext';
import { getManagerStatusMessage } from '../helpers';

export function ManagersListView() {
    const { setManagerData } = useContext(managerContext);
    const [managersList, setManagersList] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [searchByFlags, setSearchByFlags] = useState({
        searchByDepartment: true,
        searchByStatus: true,
    });

    const handleSearch = async (formData) => {
        const requestData = {
            ...getWithoutEmptyFields(formData),
            departmentID: formData.departmentData?.id || null,
            role: roles.DEPARTMENT_MANAGER,
        };

        delete requestData.departmentData;

        if (!searchByFlags.searchByStatus) delete requestData.status;
        if (!searchByFlags.searchByDepartment) delete requestData.departmentID;

        const response = await queryUsers(requestData);

        if (!response.ok) {
            setStatusMessage(getManagerStatusMessage(response));
            return;
        }

        setManagersList(response.data.results);
    };

    const handleClickOnTableItem = (userData) => {
        setManagerData(userData);
    };

    return (
        <div>
            <UserFormComponent
                submitButtonText='search managers'
                formSubmitHandler={handleSearch}
                formMode={userFormModes.FULL}
            />
            <UserSearchByFlagsComponent
                initialValues={searchByFlags}
                onChange={setSearchByFlags}
            />
            {statusMessage}
            <br />
            {managersList.length > 0 ? (
                <UsersTable
                    list={managersList}
                    onItemClick={handleClickOnTableItem}
                />
            ) : (
                'no results'
            )}
        </div>
    );
}
