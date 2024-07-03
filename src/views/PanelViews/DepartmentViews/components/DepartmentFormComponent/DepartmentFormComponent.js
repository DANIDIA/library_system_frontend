import React, { useState } from 'react';
import { InputField } from '../../../../../components';
import { getEmptyFields } from '../../../helpers';
import { departmentFormFields } from './consts';

export function DepartmentFormComponent({
    submitButtonText,
    formSubmitHandler = () => {},
    initialValues = { name: '', address: '', contactNumber: '' },
}) {
    const [formValues, setFormValues] = useState({ ...initialValues });

    const clearForm = () => {
        setFormValues(getEmptyFields(formValues));
    };

    const handleClick = () => {
        formSubmitHandler(formValues, clearForm);
    };

    const handleOnChange = (fieldName) => {
        return (value) => {
            setFormValues({ ...formValues, [fieldName]: value });
        };
    };

    return (
        <div>
            <div>
                <InputField
                    name='Name:'
                    initialValue={formValues.name}
                    onChange={handleOnChange(departmentFormFields.NAME)}
                />
                <InputField
                    name='Address:'
                    initialValue={formValues.address}
                    onChange={handleOnChange(departmentFormFields.ADDRESS)}
                />
                <InputField
                    name='Contact number:'
                    initailValu={formValues.address}
                    onChange={handleOnChange(
                        departmentFormFields.CONTACT_NUMBER,
                    )}
                    type='tel'
                />
            </div>

            <button onClick={handleClick}>{submitButtonText}</button>
        </div>
    );
}
