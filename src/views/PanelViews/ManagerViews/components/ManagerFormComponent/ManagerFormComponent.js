import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputField } from '../../../../../components';
import { layoutsPaths, panelsPaths } from '../../../../../layouts';
import { getEmptyFields } from '../../../helpers';
import { employeeStatus } from '../../../shared';
import { managerPaths } from '../../shared';
import { managerFormModes } from './shared';
import { managerFormFields } from './shared/consts';

export function ManagerFormComponent({
    submitButtonText,
    formSubmitHandler = () => {},
    formMode = managerFormModes.WITH_IS_ACTIVE_FIELD,
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
    const location = useLocation();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ ...initialValues });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    if (location.state) {
        formValues.departmentData = location.state.departmentData;
    }

    const getPasswordFieldType = () =>
        isPasswordVisible ? 'text' : 'password';

    const clearForm = () => {
        setFormValues(getEmptyFields(formValues));
    };

    const handleSelectDepartment = () => {
        navigate(
            `/${layoutsPaths.USER_PANEL}/${panelsPaths.MANAGERS_PANEL}/${managerPaths.DEPARTMENT_SELECTION}`,
            {
                state: {
                    pathToReturn: location.pathname,
                },
            },
        );
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
            <br />

            <InputField
                name='Surname:'
                initialValue={formValues.surname}
                onChange={handleOnChange(managerFormFields.SURNAME)}
            />
            <br />

            <InputField
                name='Phone number:'
                initialValue={formValues.phoneNumber}
                onChange={handleOnChange(managerFormFields.PHONE_NUMBER)}
                type='tel'
            />
            <br />

            <InputField
                name='Email:'
                initialValue={formValues.email}
                onChange={handleOnChange(managerFormFields.EMAIL)}
                type='email'
            />
            <br />

            <label>department: </label>
            {formValues.departmentData?.name || 'no department'}
            <button onClick={handleSelectDepartment}>Select department</button>
            <br />

            <InputField
                name='Login:'
                initialValue={formValues.login}
                onChange={handleOnChange(managerFormFields.LOGIN)}
            />
            <br />

            <InputField
                name={'Password:'}
                onChange={handleOnChange(managerFormFields.PASSWORD)}
                initialValue={formValues.password}
                type={getPasswordFieldType()}
            />
            <br />

            <label>Show password</label>
            <input
                checked={isPasswordVisible}
                onChange={(e) => setIsPasswordVisible(e.target.checked)}
                type='checkbox'
            />

            <br />
            {formMode === managerFormModes.WITH_IS_ACTIVE_FIELD && (
                <div>
                    <label>Status:</label>
                    <select
                        value={+formValues.status}
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                isActive: e.target.value,
                            })
                        }
                    >
                        <option value={employeeStatus.BLOCKED}>Blocked</option>
                        <option value={employeeStatus.ACTIVE}>Active</option>
                    </select>
                    <br />
                </div>
            )}
            <button onClick={handleSubmit}>{submitButtonText}</button>
        </div>
    );
}
