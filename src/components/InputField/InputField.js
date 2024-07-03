import React from 'react';

export function InputField({
    name,
    initialValue,
    onChange = () => {},
    type = 'text',
}) {
    return (
        <div>
            <label>{name}</label>
            <input
                value={initialValue}
                onChange={(e) => onChange(e.target.value)}
                type={type}
            />
        </div>
    );
}
