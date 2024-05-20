import React from 'react';
import { DepartmentFormView } from '../components';

export function DepartmentCreationView() {
    const handleCreation = () => {};

    return (
        <div>
            <DepartmentFormView
                submitButtonText='create'
                formSubmitHandler={handleCreation}
            />
        </div>
    );
}
