import React, { useState } from 'react';
import { getClearedFields } from '../../../helpers';

export function DepartmentFormComponent({
    submitButtonText,
    formSubmitHandler = () => {},
    initialValues = { name: '', address: '', contactNumber: '' },
}) {
    const [formValues, setFormValues] = useState({ ...initialValues });

    const clearForm = () => {
        setFormValues(getClearedFields(formValues));
    };

    const handleClick = () => {
        formSubmitHandler(formValues, clearForm);
    };

    return (
        <div>
            <div>
                <label>Name:</label>
                <input
                    value={formValues.name}
                    onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                    }
                    type='text'
                />
                <label>Address:</label>
                <input
                    value={formValues.address}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            address: e.target.value,
                        })
                    }
                    type='text'
                />
                <label>Contact number</label>
                <input
                    value={formValues.contactNumber}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            contactNumber: e.target.value,
                        })
                    }
                    type='tel'
                />
            </div>

            <button onClick={handleClick}>{submitButtonText}</button>
        </div>
    );
}
