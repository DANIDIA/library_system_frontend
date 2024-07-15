import React, { useState } from 'react';
import { InputField, StatusSelect } from '../../../../../components';
import { getEmptyFields } from '../../../helpers';
import { readerFormModes } from './readerFormModes';

export function ReaderFormComponent({
    submitButtonText = '',
    submitHandler = () => {},
    mode = readerFormModes.FULL_FORM_MODE,
    initialValues = {
        name: '',
        surname: '',
        phoneNumber: '',
        email: '',
        status: true,
    },
}) {
    const [formValues, setFormValues] = useState(initialValues);

    const getFieldHandler = (fieldName) => {
        return (e) => {
            setFormValues({ ...formValues, [fieldName]: e.target.value });
        };
    };

    const clearForm = () => {
        setFormValues(getEmptyFields(formValues));
    };

    const handleSubmit = () => {
        submitHandler(formValues, clearForm);
    };

    return (
        <div>
            <InputField name='Name:' onChange={getFieldHandler('name')} />
            <br />
            <InputField name='Surname:' onChange={getFieldHandler('surname')} />
            <br />
            <InputField
                name='phoneNumber'
                type='tel'
                onChange={getFieldHandler('phoneNumber')}
            />
            <br />
            <InputField
                name='Email:'
                type='email'
                onChange={getFieldHandler('email')}
            />
            <br />
            {mode === readerFormModes.FULL_FORM_MODE && (
                <StatusSelect
                    initialStatus={formValues.status}
                    onChange={getFieldHandler('status')}
                />
            )}

            <button onChange={handleSubmit}>{submitButtonText}</button>
        </div>
    );
}
