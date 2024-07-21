import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function SelectResourceComponent({
    fieldName,
    initialValue = {},
    pathToSelect,
    resourceFieldNameToShow = 'name',
    onRedirect = () => {},
    onChange = () => {},
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedValue, setSelectedValue] = useState(initialValue);

    const getSelectedValue = () => {
        if (location.state?.selectedData) {
            setSelectedValue(location.state.selectedData);
            onChange(location.state.selectedData);
        }
    };

    useEffect(getSelectedValue, [location.state]);

    const handleSelect = () => {
        onRedirect();
        navigate(pathToSelect, {
            state: {
                pathToReturn: location.pathname,
            },
        });
    };

    const handleSelectionClear = () => {
        onChange(null);
        setSelectedValue(null);
    };

    return (
        <div>
            <label>{fieldName}</label>
            {selectedValue &&
            Object.hasOwn(selectedValue, resourceFieldNameToShow)
                ? selectedValue[resourceFieldNameToShow]
                : 'No selected value'}
            <button onClick={handleSelect}>Select value</button>
            <button onClick={handleSelectionClear}>Clear value</button>
        </div>
    );
}
