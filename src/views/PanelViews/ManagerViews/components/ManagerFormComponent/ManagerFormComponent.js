import React, { useEffect, useState } from 'react';
import {
    InputField,
    SelectFromQuery,
    StatusSelect,
} from '../../../../../components';
import { layoutsPaths, panelsPaths } from '../../../../../layouts';
import { getEmptyFields } from '../../../helpers';
import { employeeStatus, pathsInPanel } from '../../../shared';
import { managerFormModes } from './shared';
import { managerFormFields } from './shared/consts';

export function ManagerFormComponent({
    submitButtonText,
    formSubmitHandler = () => {},
    formMode,
    initialValues = {
        name: '',
        surname: '',
        phoneNumber: '',
        email: '',
        login: '',
        password: '',
        departmentData: null,
        status: employeeStatus.ACTIVE,
    },
}) {
    const [formValues, setFormValues] = useState({ ...initialValues });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        if (Object.hasOwn(sessionStorage, location.pathname)) {
            setFormValues(
                JSON.parse(sessionStorage.getItem(location.pathname)),
            );
            sessionStorage.clear();
        }
    }, []);

    const getPasswordFieldType = () =>
        isPasswordVisible ? 'text' : 'password';

    const clearForm = () => {
        setFormValues(getEmptyFields(formValues));
    };

    const handleSubmit = () => {
        formSubmitHandler(formValues, clearForm);
    };

    const handleOnChange = (fieldName) => {
        return (value) => {
            setFormValues({ ...formValues, [fieldName]: value });
        };
    };

    return (
        <div>
            <InputField
                name='Name:'
                initialValue={formValues.name}
                onChange={handleOnChange(managerFormFields.NAME)}
            />

            <InputField
                name='Surname:'
                initialValue={formValues.surname}
                onChange={handleOnChange(managerFormFields.SURNAME)}
            />

            <InputField
                name='Phone number:'
                initialValue={formValues.phoneNumber}
                onChange={handleOnChange(managerFormFields.PHONE_NUMBER)}
                type='tel'
            />

            <InputField
                name='Email:'
                initialValue={formValues.email}
                onChange={handleOnChange(managerFormFields.EMAIL)}
                type='email'
            />

            <SelectFromQuery
                fieldName='Department:'
                pathToSelect={`/${layoutsPaths.USER_PANEL}/${panelsPaths.DEPARTMENTS_PANEL}/${pathsInPanel.SEARCH}`}
                initialValue={formValues.departmentData}
                onRedirect={() =>
                    sessionStorage.setItem(
                        location.pathname,
                        JSON.stringify(formValues),
                    )
                }
                onChange={handleOnChange(managerFormFields.DEPARTMENT_DATA)}
            />

            {formMode === managerFormModes.FULL && (
                <div>
                    <InputField
                        name='Login:'
                        initialValue={formValues.login}
                        onChange={handleOnChange(managerFormFields.LOGIN)}
                    />

                    <InputField
                        name={'Password:'}
                        onChange={handleOnChange(managerFormFields.PASSWORD)}
                        initialValue={formValues.password}
                        type={getPasswordFieldType()}
                    />

                    <label>Show password</label>
                    <input
                        checked={isPasswordVisible}
                        onChange={(e) => setIsPasswordVisible(e.target.checked)}
                        type='checkbox'
                    />

                    <StatusSelect
                        initialStatus={formValues.status}
                        onChange={handleOnChange(managerFormFields.STATUS)}
                    />
                </div>
            )}

            <button onClick={handleSubmit}>{submitButtonText}</button>
        </div>
    );
}
