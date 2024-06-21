import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { queryDepartments } from '../../../../apiOperations';
import { getWithoutEmptyFields } from '../../helpers';
import { pathsInPanel } from '../../shared';
import { DepartmentContext } from '../DepartmentContext';
import { DepartmentFormComponent } from '../components';
import { getDepartmentStatusMessage } from '../helpers';

export function DepartmentListView() {
    const location = useLocation();
    const { setDepartmentData } = useContext(DepartmentContext);
    const navigate = useNavigate();
    const [departmentsList, setDepartmentsList] = useState();
    const [statusMessage, setStatusMessage] = useState('');

    const handleSearch = async (formData) => {
        const response = await queryDepartments(
            getWithoutEmptyFields(formData),
        );

        if (response.ok) {
            setDepartmentsList(response.data);
        } else {
            setStatusMessage(getDepartmentStatusMessage(response.status));
        }
    };

    const handleOnListItem = (department) => {
        if (location.state) {
            navigate(location.state.pathToReturn, {
                state: { departmentData: department },
            });
        } else {
            setDepartmentData(department);
            navigate(`../${pathsInPanel.PAGE}`);
        }
    };

    const table = (
        <table>
            <thead>
                <tr>
                    <th>Department name</th>
                    <th>Address</th>
                    <th>Contact number</th>
                </tr>
            </thead>
            <tbody>
                {departmentsList?.map((data, i) => (
                    <tr onClick={() => handleOnListItem(data)} key={i}>
                        <td>{data.name}</td>
                        <td>{data.address}</td>
                        <td>{data.contactNumber}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div>
            <DepartmentFormComponent
                submitButtonText='search'
                formSubmitHandler={handleSearch}
            />
            {statusMessage}
            {departmentsList &&
                (departmentsList.length > 0 ? table : 'no results')}
        </div>
    );
}
