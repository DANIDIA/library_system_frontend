import React, { useState } from 'react';
import { employeeStatus } from '../../../shared';
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
        isActive: employeeStatus.ACTIVE,
    },
}) {
    const [name, setName] = useState(initialValues.name);
    const [surname, setSurname] = useState(initialValues.surname);
    const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber);
    const [email, setEmail] = useState(initialValues.email);
    const [login, setLogin] = useState(initialValues.login);
    const [password, setPassword] = useState(initialValues.password);
    const [isActive, setIsActive] = useState(initialValues.isActive);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const showPassword = () => (isPasswordVisible ? 'text' : 'password');

    const clearForm = () => {
        setName('');
        setSurname('');
        setPhoneNumber('');
        setEmail('');
        setLogin('');
        setPassword('');
    };

    const handleClick = () => {
        formSubmitHandler(
            {
                name,
                surname,
                phoneNumber,
                email,
                login,
                password,
            },
            clearForm,
        );
    };

    return (
        <div>
            <label>Name:</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
            />
            <br />

            <label>Surname:</label>
            <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                type='text'
            />
            <br />

            <label>Phone number:</label>
            <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type='tel'
            />
            <br />

            <label>email:</label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
            />
            <br />

            <label>login:</label>
            <input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                type='text'
            />
            <br />

            <label>Password:</label>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword()}
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
                        value={+isActive}
                        onChange={(e) => setIsActive(e.target.value)}
                    >
                        <option value={employeeStatus.BLOCKED}>Blocked</option>
                        <option value={employeeStatus.ACTIVE}>Active</option>
                    </select>
                    <br />
                </div>
            )}

            <button onClick={handleClick}>{submitButtonText}</button>
        </div>
    );
}
