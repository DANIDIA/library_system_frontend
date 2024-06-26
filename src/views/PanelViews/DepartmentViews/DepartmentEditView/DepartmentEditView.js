import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateDepartment } from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { hasChangedValues, hasEmptyFields } from '../../helpers';
import { DepartmentContext } from '../DepartmentContext';
import { DepartmentFormComponent } from '../components';
import { getDepartmentStatusMessage } from '../helpers';

export function DepartmentEditView() {
    const navigate = useNavigate();
    const { userData } = useContext(SessionContext);
    const { departmentData, setDepartmentData } = useContext(DepartmentContext);
    const [statusMessage, setStatusMessage] = useState('');

    const userRole = userData.role;

    const hasEditDepartmentPermission =
        (userRole === roles.DEPARTMENT_MANAGER &&
            userData.departmentID === departmentData.id) ||
        userRole === roles.ADMIN;

    const validateFormData = (formData) => {
        if (hasEmptyFields(formData, ['actualManagerID'])) {
            setStatusMessage('There are empty fields!');
            return false;
        }
        if (!hasChangedValues(departmentData, formData)) {
            setStatusMessage('Values was not change');
            return false;
        }

        return true;
    };

    const handleUpdateData = async (formData) => {
        if (formData.actualManagerID === departmentData.actualManagerID) {
            delete formData.actualManagerID;
        }

        if (!validateFormData(formData)) return;

        const response = await updateDepartment(departmentData.id, formData);

        if (response.ok) {
            setDepartmentData({ id: departmentData.id, ...formData });
            navigate('..');
        } else {
            setStatusMessage(getDepartmentStatusMessage(response));
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
