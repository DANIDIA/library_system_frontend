import React, { useState } from 'react';

export function UserSearchByFlagsComponent({
    initialValues = { searchByDepartment: true, searchByStatus: true },
    onChange,
}) {
    const [searchByFlags, setSearchByFlags] = useState(initialValues);

    const handleCheckBoxChange = (checkBoxName) => {
        return (e) => {
            const newValues = {
                ...searchByFlags,
                [checkBoxName]: e.target.checked,
            };

            setSearchByFlags(newValues);
            onChange(newValues);
        };
    };

    return (
        <div>
            Search by department
            <input
                type='checkbox'
                checked={searchByFlags.searchByDepartment}
                onChange={handleCheckBoxChange('searchByDepartment')}
            />
            <br />
            Search by status
            <input
                type='checkbox'
                checked={searchByFlags.searchByStatus}
                onChange={handleCheckBoxChange('searchByStatus')}
            />
        </div>
    );
}
