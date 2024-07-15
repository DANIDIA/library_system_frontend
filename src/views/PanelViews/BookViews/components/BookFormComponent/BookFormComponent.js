import React, { useState } from 'react';
import { InputField } from '../../../../../components';
import { getEmptyFields } from '../../../helpers';

export function BookFormComponent({
    submitButtonText,
    formSubmitHandler = () => {},
    initialValues = { title: '', authorsIDs: [] },
}) {
    const [formValues, setFormValues] = useState(initialValues);

    const clearForm = () => {
        setFormValues(getEmptyFields(formValues));
    };

    const onSubmit = () => {
        formSubmitHandler(formValues, clearForm);
    };

    const handleOnChange = (fieldName) => {
        return (value) => {
            setFormValues({ ...formValues, [fieldName]: value });
        };
    };

    return (
        <div>
            <InputField name='title' onChange={handleOnChange('title')} />
            <button onClick={onSubmit}>{submitButtonText}</button>
        </div>
    );
}
