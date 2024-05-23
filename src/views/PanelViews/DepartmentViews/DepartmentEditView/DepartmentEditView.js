import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateDepartment } from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { DepartmentContext } from '../DepartmentContext';
import { DepartmentFormView } from '../components';

export function DepartmentEditView() {
    const navigate = useNavigate();
    const { userData } = useContext(SessionContext);
    const { departmentData, setDepartmentData } = useContext(DepartmentContext);
    const [messageText, setMessageText] = useState();

    const userRole = userData.role;

    const hasEditDepartmentPermission =
        (userRole === roles.DEPARTMENT_MANAGER &&
            userData.departmentID === departmentData.id) ||
        userRole === roles.ADMIN;

    const validateFormData = (formData) => {
        const areEmptyFields = Object.entries(formData).some(
            (pair) => !pair[1].trim(),
        );

        const areValuesChanged = Object.entries(formData).some(
            (pair) => pair[1] !== departmentData[pair[0]],
        );

        if (areEmptyFields) {
            setMessageText('There are empty fields!');
            return false;
        } else if (!areValuesChanged) {
            setMessageText('Values was not change');
            return false;
        }

        return true;
    };

    const handleUpdateData = async (formData) => {
        const isFormDataValid = validateFormData(formData);

        if (!isFormDataValid) return;

        const response = await updateDepartment(
            userData.sessionID,
            departmentData.id,
            formData,
        );

        if (response.ok) {
            setDepartmentData({ id: departmentData.id, ...formData });
            navigate('..');
        } else {
            if (!response.status) {
                setMessageText(
                    'Oops... Some problems with internet connection or server. Please, check your connection',
                );
            } else if (response.status === 403) {
                setMessageText('Please, login again');
            } else if (response.status >= 500) {
                setMessageText('Oops... some problems with server');
            }
        }
    };

    return (
        <div>
            {hasEditDepartmentPermission ? (
                <div>
                    <DepartmentFormView
                        submitButtonText='update'
                        initialValues={departmentData}
                        formSubmitHandler={handleUpdateData}
                    />
                    {messageText}
                </div>
            ) : (
                "You don't have permission"
            )}
            <button onClick={() => navigate('..')}>back</button>
        </div>
    );
}
