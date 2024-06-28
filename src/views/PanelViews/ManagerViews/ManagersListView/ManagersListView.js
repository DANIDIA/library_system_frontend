import React, { useState } from 'react';
import { queryUsers } from '../../../../apiOperations/usersAPIOperations';
import { roles } from '../../../../shared';
import { ManagersTable } from '../../DepartmentViews/DepartmentListView/components';
import { getWithoutEmptyFields } from '../../helpers';
import { ManagerFormComponent, managerFormModes } from '../components';
import { getManagerStatusMessage } from '../helpers';

export function ManagersListView() {
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

    const handleCheckBoxChange = (checkBoxName) => {
        return (e) => {
            setSearchByFlags({
                ...searchByFlags,
                [checkBoxName]: e.target.checked,
            });
        };
    };
    return (
        <div>
            <ManagerFormComponent
                submitButtonText='search managers'
                formSubmitHandler={handleSearch}
                formMode={managerFormModes.FULL}
            />
            Search by department
            <input
                type='checkbox'
                checked={searchByFlags.searchByDepartment}
                onChange={handleCheckBoxChange('searchByDepartment')}
            />
            <br />
            Search by status
            <input
                type='checkbox'
                checked={searchByFlags.searchByStatus}
                onChange={handleCheckBoxChange('searchByStatus')}
            />
            {statusMessage}
            <br />
            {managersList.length > 0 ? (
                <ManagersTable list={managersList} />
            ) : (
                'no results'
            )}
        </div>
    );
}
