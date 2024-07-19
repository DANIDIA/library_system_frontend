import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { InputField, SelectResourceComponent } from '../../../../../components';
import { getEmptyFields, saveFormData } from '../../../helpers';
import { departmentFormFields } from './consts';

export function DepartmentFormComponent({
    submitButtonText,
    formSubmitHandler = () => {},
    initialValues = {
        name: '',
        address: '',
        contactNumber: '',
        managerData: null,
    },
}) {
    const location = useLocation();
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
                    initailValue={formValues.address}
                    onChange={handleOnChange(
                        departmentFormFields.CONTACT_NUMBER,
                    )}
                    type='tel'
                />
                <SelectResourceComponent
                    fieldName='department manager:'
                    initialValue={formValues.managerData}
                    onChange={handleOnChange(departmentFormFields.MANAGER_DATA)}
                    onRedirect={() =>
                        saveFormData(location.pathname, formValues)
                    }
                />
            </div>

            <button onClick={handleClick}>{submitButtonText}</button>
        </div>
    );
}
