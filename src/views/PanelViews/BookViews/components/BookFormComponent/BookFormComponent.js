import React, { useState } from 'react';
import { InputField } from '../../../../../components';

export function BookFormComponent({
    submitButtonText,
    formSubmitHandler = () => {},
    initialValues = { title: '', authors: [] },
}) {
    const [formValues, setFormValues] = useState(initialValues);

    const handleOnChange = (fieldName) => {
        return (value) => {
            setFormValues({ ...formValues, [fieldName]: value });
        };
    };

    return (
        <div>
            <InputField name='title' onChange={handleOnChange('title')} />
            <button onClick={formSubmitHandler}>{submitButtonText}</button>
        </div>
    );
}
