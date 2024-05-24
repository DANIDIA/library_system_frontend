import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateDepartment } from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { DepartmentContext } from '../DepartmentContext';
import { DepartmentFormComponent } from '../components';
import { getDepartmentStatusMessage } from '../helpers';

export function DepartmentEditView() {
    const navigate = useNavigate();
    const { userData } = useContext(SessionContext);
    const { departmentData, setDepartmentData } = useContext(DepartmentContext);
    const [statusMessage, setStatusMessage] = useState();

    const userRole = userData.role;

    const hasEditDepartmentPermission =
        (userRole === roles.DEPARTMENT_MANAGER &&
            userData.departmentID === departmentData.id) ||
        userRole === roles.ADMIN;

    const validateFormData = (formData) => {
        const hasEmptyFields = Object.entries(formData).some(
            (pair) => !pair[1].trim(),
        );

        const hasChangedValues = Object.entries(formData).some(
            (pair) => pair[1] !== departmentData[pair[0]],
        );

        if (hasEmptyFields) {
            setStatusMessage('There are empty fields!');
            return false;
        } else if (!hasChangedValues) {
            setStatusMessage('Values was not change');
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
            setStatusMessage(getDepartmentStatusMessage(response.status));
        }
    };

    return (
        <div>
            {hasEditDepartmentPermission ? (
                <div>
                    <DepartmentFormComponent
                        submitButtonText='update'
                        initialValues={departmentData}
                        formSubmitHandler={handleUpdateData}
                    />
                    {statusMessage}
                </div>
            ) : (
                "You don't have permission"
            )}
            <button onClick={() => navigate('..')}>back</button>
        </div>
    );
}
