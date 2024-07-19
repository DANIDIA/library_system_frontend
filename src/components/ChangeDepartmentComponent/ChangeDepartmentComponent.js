import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function ChangeDepartmentComponent({
    fieldName,
    initialValue,
    pathToSelect,
    onRedirect = () => {},
    onChange = () => {},
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedValue, setSelectedValue] = useState(initialValue);

    useEffect(() => {
        if (location.state) {
            setSelectedValue(location.state.selectedData);
            onChange(location.state.selectedData);
            location.state = null;
        }
    }, [location.state]);

    const handleSelectDepartment = () => {
        onRedirect();
        navigate(pathToSelect, {
            state: {
                pathToReturn: location.pathname,
            },
        });
    };

    const handleClearValue = () => {
        onChange(null);
        setSelectedValue(null);
    };

    return (
        <div>
            <label>{fieldName}</label>
            {selectedValue?.name || 'No selected value'}
            <button onClick={handleSelectDepartment}>Select department</button>
            <button onClick={handleClearValue}>Clear value</button>
        </div>
    );
}
