import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryDepartments } from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { DepartmentSelectionContext } from '../../ManagerViews/DepartmentSelectionContext';
import { getWithoutEmptyFields } from '../../helpers';
import { pathsInPanel } from '../../shared';
import { DepartmentContext } from '../DepartmentContext';
import { DepartmentFormComponent } from '../components';
import { getDepartmentStatusMessage } from '../helpers';

export function DepartmentListView() {
    const { userData } = useContext(SessionContext);
    const { setDepartmentData } = useContext(DepartmentContext);
    const {
        setSelectedDepartmentData,
        isRedirectedToTakeData,
        setIsRedirectedToTakeData,
    } = useContext(DepartmentSelectionContext);
    const navigate = useNavigate();
    const [departmentsList, setDepartmentsList] = useState();
    const [statusMessage, setStatusMessage] = useState('');

    const handleSearch = async (formData) => {
        const response = await queryDepartments(
            userData.sessionID,
            getWithoutEmptyFields(formData),
        );

        if (response.ok) {
            setDepartmentsList(response.data);
        } else {
            setStatusMessage(getDepartmentStatusMessage(response.status));
        }
    };

    const handleOnListItem = (department) => {
        if (isRedirectedToTakeData) {
            setSelectedDepartmentData(department);
            setIsRedirectedToTakeData(false);
            navigate(-1);
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
