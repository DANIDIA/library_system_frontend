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
import { LibrarianContext } from '../LibrarianContext';
import { getLibrarianStatusMessage } from '../helpers';

export function LibrarianListView() {
    const { setLibrarianData } = useContext(LibrarianContext);
    const [librariansList, setLibrariansList] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [searchByFlags, setSearchByFlags] = useState({
        searchByDepartment: true,
        searchByStatus: true,
    });

    const handleSearch = async (formData) => {
        const requestData = {
            ...getWithoutEmptyFields(formData),
            departmentID: formData.departmentData?.id || null,
            role: roles.LIBRARIAN,
        };

        delete requestData.departmentData;

        if (!searchByFlags.searchByStatus) delete requestData.status;
        if (!searchByFlags.searchByDepartment) delete requestData.departmentID;

        const response = await queryUsers(requestData);

        if (!response.ok) {
            setStatusMessage(getLibrarianStatusMessage(response));
            return;
        }

        setLibrariansList(response.data.results);
    };

    const handleClickOnTableItem = (userData) => {
        setLibrarianData(userData);
    };

    return (
        <div>
            <UserFormComponent
                submitButtonText='search managers'
                employeeRole={roles.LIBRARIAN}
                formMode={userFormModes.FULL}
                formSubmitHandler={handleSearch}
            />
            <UserSearchByFlagsComponent
                initialValues={searchByFlags}
                onChange={setSearchByFlags}
            />
            {statusMessage} <br />
            {librariansList.length > 0 ? (
                <UsersTable
                    list={librariansList}
                    onItemClick={handleClickOnTableItem}
                />
            ) : (
                'no results'
            )}
        </div>
    );
}
