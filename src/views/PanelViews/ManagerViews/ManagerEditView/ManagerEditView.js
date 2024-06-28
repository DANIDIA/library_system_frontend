import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDepartment } from '../../../../apiOperations';
import {
    getUser,
    updateUser,
} from '../../../../apiOperations/usersAPIOperations';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { hasChangedValues, hasEmptyFields } from '../../helpers';
import { pathsInPanel } from '../../shared';
import { managerContext } from '../ManagerContext';
import { ManagerFormComponent, managerFormModes } from '../components';
import { getManagerStatusMessage } from '../helpers';

export function ManagerEditView() {
    const navigate = useNavigate();
    const { managerID } = useParams();
    const { userData } = useContext(SessionContext);
    const { managerData, setManagerData } = useContext(managerContext);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        (async () => {
            if (managerData) return;

            const managerDataResponse = await getUser(managerID);

            if (!managerDataResponse.ok) {
                setStatusMessage(getManagerStatusMessage(managerDataResponse));
            }

            if (!managerDataResponse.data.departmentID) {
                setManagerData({ ...managerData });
                return;
            }

            const departmentData = await getDepartment(
                managerDataResponse.data.departmentID,
            );

            setManagerData({
                ...managerDataResponse.data,
                departmentData: departmentData,
            });
        })();
    }, []);

    const validateFormData = (formData) => {
        if (hasEmptyFields(formData)) {
            setStatusMessage('There are empty fields!');
            return false;
        }
        if (!hasChangedValues(managerData, formData)) {
            setStatusMessage('Values was not change');
            return false;
        }

        return true;
    };

    const handleUpdate = async (formData) => {
        console.log(formData);
        if (!validateFormData(formData)) return;

        const requestData = {
            ...formData,
            departmentID: formData?.departmentData?.id,
        };

        delete requestData.departmentData;

        const response = await updateUser(formData.id, requestData);

        if (!response.ok) {
            setStatusMessage(getManagerStatusMessage(response));
        } else {
            setManagerData(formData);
            navigate(`../${pathsInPanel.PAGE}/${managerID}`);
        }
    };

    return (
        <div>
            {userData.role === roles.ADMIN ? (
                <ManagerFormComponent
                    submitButtonText='update'
                    formMode={managerFormModes.FULL}
                    formSubmitHandler={handleUpdate}
                    initialValues={managerData}
                />
            ) : (
                'You do not have permission'
            )}
            <button onClick={() => navigate('..')}>back</button>
            <br />
            {statusMessage}
        </div>
    );
}
