import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getUser,
    updateUser,
} from '../../../../apiOperations/usersAPIOperations';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';
import { UserFormComponent, userFormModes } from '../../components';
import { userFormValidator } from '../../helpers';
import { pathsInPanel } from '../../shared';
import { LibrarianContext } from '../LibrarianContext';
import { getLibrarianStatusMessage } from '../helpers';

export function LibrarianEditView() {
    const navigate = useNavigate();
    const { librarianID } = useParams();
    const { librarianData, setLibrarianData } = useContext(LibrarianContext);
    const { userData } = useContext(SessionContext);
    const [statusMessage, setStatusMessage] = useState('');

    const haveEditPermission =
        userData.role === roles.ADMIN ||
        (userData.role === roles.DEPARTMENT_MANAGER &&
            librarianData.departmentID === userData.departmentID);

    useEffect(() => {
        (async () => {
            const response = await getUser(librarianID);

            if (!response.ok) {
                setStatusMessage(getLibrarianStatusMessage(response));
            } else {
                setLibrarianData(response.data);
            }
        })();
    }, []);

    const handleUpdate = async (formData) => {
        console.log(formData);
        if (!userFormValidator(formData, setStatusMessage)) return;

        const requestData = {
            ...formData,
            departmentID: formData?.departmentData?.id || null,
        };
        delete requestData.departmentData;

        const response = await updateUser(librarianID, requestData);

        if (!response.ok) {
            setStatusMessage(getLibrarianStatusMessage(response));
        } else {
            setLibrarianData({
                requestData,
                departmentData: formData.deaprtmentData,
            });
            navigate(`../${pathsInPanel.PAGE}/${librarianID}`);
        }
    };

    return (
        <div>
            {haveEditPermission ? (
                <UserFormComponent
                    submitButtonText='update'
                    formMode={userFormModes.FULL}
                    employeeRole={roles.LIBRARIAN}
                    initialValues={librarianData}
                    formSubmitHandler={handleUpdate}
                />
            ) : (
                'You do not have permission'
            )}
            <button
                onClick={() =>
                    navigate(`../${pathsInPanel.PAGE}/${librarianID}`)
                }
            >
                back
            </button>
            <br />
            {statusMessage}
        </div>
    );
}
