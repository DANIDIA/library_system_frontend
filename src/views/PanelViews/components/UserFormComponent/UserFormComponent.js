import React, { useEffect, useState } from 'react';
import {
    ChangeDepartmentComponent,
    InputField,
    StatusSelect,
} from '../../../../components';
import { layoutsPaths, panelsPaths } from '../../../../layouts';
import { getEmptyFields } from '../../helpers';
import { accountStatuses, pathsInPanel } from '../../shared';
import { userFormFields, userFormModes } from './shared';

export function UserFormComponent({
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
        status: accountStatuses.ACTIVE,
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

    const saveFormValues = () => {
        sessionStorage.setItem(location.pathname, JSON.stringify(formValues));
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
                onChange={handleOnChange(userFormFields.NAME)}
            />

            <InputField
                name='Surname:'
                initialValue={formValues.surname}
                onChange={handleOnChange(userFormFields.SURNAME)}
            />

            <InputField
                name='Phone number:'
                initialValue={formValues.phoneNumber}
                onChange={handleOnChange(userFormFields.PHONE_NUMBER)}
                type='tel'
            />

            <InputField
                name='Email:'
                initialValue={formValues.email}
                onChange={handleOnChange(userFormFields.EMAIL)}
                type='email'
            />

            <ChangeDepartmentComponent
                fieldName='Department:'
                pathToSelect={`/${layoutsPaths.USER_PANEL}/${panelsPaths.DEPARTMENTS_PANEL}/${pathsInPanel.SEARCH}`}
                initialValue={formValues.departmentData}
                onRedirect={saveFormValues}
                onChange={handleOnChange(userFormFields.DEPARTMENT_DATA)}
            />

            {formMode === userFormModes.FULL && (
                <div>
                    <InputField
                        name='Login:'
                        initialValue={formValues.login}
                        onChange={handleOnChange(userFormFields.LOGIN)}
                    />

                    <InputField
                        name={'Password:'}
                        onChange={handleOnChange(userFormFields.PASSWORD)}
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
                        onChange={handleOnChange(userFormFields.STATUS)}
                    />
                </div>
            )}

            <button onClick={handleSubmit}>{submitButtonText}</button>
        </div>
    );
}
