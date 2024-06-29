import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { layoutsPaths, panelsPaths } from '../../../../../layouts';
import { getEmptyFields } from '../../../helpers';
import { employeeStatus } from '../../../shared';
import { managerPaths } from '../../shared';
import { managerFormModes } from './shared';

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
        isActive: employeeStatus.ACTIVE,
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

    return (
        <div>
            <label>Name:</label>
            <input
                value={formValues.name}
                onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                }
                type='text'
            />
            <br />

            <label>Surname:</label>
            <input
                value={formValues.surname}
                onChange={(e) =>
                    setFormValues({ ...formValues, surname: e.target.value })
                }
                type='text'
            />
            <br />

            <label>Phone number:</label>
            <input
                value={formValues.phoneNumber}
                onChange={(e) =>
                    setFormValues({
                        ...formValues,
                        phoneNumber: e.target.value,
                    })
                }
                type='tel'
            />
            <br />

            <label>email:</label>
            <input
                value={formValues.email}
                onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                }
                type='email'
            />
            <br />

            <label>department: </label>
            {formValues.departmentData?.name || 'no department'}
            <button onClick={handleSelectDepartment}>Select department</button>
            <br />

            <label>login:</label>
            <input
                value={formValues.login}
                onChange={(e) =>
                    setFormValues({ ...formValues, login: e.target.value })
                }
                type='text'
            />
            <br />

            <label>Password:</label>
            <input
                value={formValues.password}
                onChange={(e) =>
                    setFormValues({ ...formValues, password: e.target.value })
                }
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
                        value={+formValues.isActive}
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
