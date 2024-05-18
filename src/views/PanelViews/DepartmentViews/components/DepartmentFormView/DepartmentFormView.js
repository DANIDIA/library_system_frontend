import React, { useState } from 'react';

export function DepartmentFormView({
    buttonText,
    buttonClickHandler,
    startValues = {},
}) {
    const [name, setName] = useState(startValues.name);
    const [address, setAddress] = useState(startValues.address);
    const [contactNumber, setContactNumber] = useState(
        startValues.contactNumber,
    );

    const handleClick = () => {
        const formData = { name, address, contactNumber };
        buttonClickHandler(formData);
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
                    type='text'
                />
            </div>

            <button onClick={handleClick}>{buttonText}</button>
        </div>
    );
}
