import React, { useState } from 'react';
import { employeeStatus } from '../../views';

export function StatusSelect({ initialStatus = true, onChange = () => {} }) {
    const [status, setStatus] = useState(initialStatus);

    const handleOnChange = (e) => {
        setStatus(!!+e.target.value);
        onChange(!!+e.target.value);
    };

    return (
        <div>
            <label>Status:</label>
            <select value={+status} onChange={handleOnChange}>
                <option value={+employeeStatus.BLOCKED}>Blocked</option>
                <option value={+employeeStatus.ACTIVE}>Active</option>
            </select>
        </div>
    );
}
