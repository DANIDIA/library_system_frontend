import React, { useState } from 'react';

export function DepartmentFormView({ buttonText, buttonClickHandler }) {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [contactNumber, setContactNumber] = useState();

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
