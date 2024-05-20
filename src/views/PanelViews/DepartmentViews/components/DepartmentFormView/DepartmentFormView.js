import React, { useState } from 'react';

export function DepartmentFormView({
    submitButtonText = {},
    formSubmitHandler = {},
    initialValues = {},
}) {
    const [name, setName] = useState(initialValues.name);
    const [address, setAddress] = useState(initialValues.address);
    const [contactNumber, setContactNumber] = useState(
        initialValues.contactNumber,
    );

    const handleClick = () => {
        formSubmitHandler({ name, address, contactNumber });
    };

    return (
        <div>
            <div>
                <label>Name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                />
                <label>Address:</label>
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type='text'
                />
                <label>Contact number</label>
                <input
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    type='tel'
                />
            </div>

            <button onClick={handleClick}>{submitButtonText}</button>
        </div>
    );
}
