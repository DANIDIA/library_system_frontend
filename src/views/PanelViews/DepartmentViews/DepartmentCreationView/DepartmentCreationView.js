import React from 'react';
import { DepartmentFormView } from '../components';

export function DepartmentCreationView() {
    const handleCreation = () => {};

    return (
        <div>
            <DepartmentFormView
                buttonText='create'
                buttonClickHandler={handleCreation}
            />
        </div>
    );
}
