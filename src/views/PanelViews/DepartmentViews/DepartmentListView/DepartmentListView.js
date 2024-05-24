import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryDepartments } from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { DepartmentContext } from '../DepartmentContext';
import { DepartmentFormComponent } from '../components';
import { departmentPaths } from '../shared';

export function DepartmentListView() {
    const { userData } = useContext(SessionContext);
    const { setDepartmentData } = useContext(DepartmentContext);
    const navigate = useNavigate();
    const [departmentsList, setDepartmentsList] = useState();
    const [statusMessage, setStatusMessage] = useState('');

    const handleSearch = async (fromData) => {
        const query = Object.fromEntries(
            Object.entries(fromData).filter((pair) => pair[1]),
        );

        const response = await queryDepartments(userData.sessionID, query);

        if (!response.ok) {
            if (response.status === 403) {
                setStatusMessage(
                    'Current session is ended. Please login again',
                );
            } else if (response.status >= 500) {
                setStatusMessage('Oops... some problems with server');
            } else if (!response.status) {
                setStatusMessage('Some problems with internet connection');
            }
        } else {
            setDepartmentsList(response.data);
        }
    };

    const handleOnListItem = (department) => {
        setDepartmentData(department);
        navigate(`../${departmentPaths.PAGE}`);
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
