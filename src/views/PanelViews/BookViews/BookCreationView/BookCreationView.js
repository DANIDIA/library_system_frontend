import React, { useState } from 'react';
import { createBook } from '../../../../apiOperations';
import { hasEmptyFields } from '../../helpers';
import { BookFormComponent } from '../components';
import { getBookStatusMessage } from '../helpers';

export function BookCreationView() {
    const [statusMessage, setStatusMessage] = useState('');

    const validateFormData = (formData) => {
        if (hasEmptyFields(formData)) {
            setStatusMessage('There are empty fields!');
            return false;
        }

        return true;
    };

    const handleBookCreation = async (formData, clearForm) => {
        const isFormDataValid = validateFormData(formData);

        if (!isFormDataValid) return;

        const response = await createBook(formData);

        if (response.ok) {
            setStatusMessage('Successfully created');
            clearForm();
        } else {
            setStatusMessage(getBookStatusMessage(response));
        }
    };

    return (
        <div>
            <BookFormComponent
                submitButtonText={'create'}
                formSubmitHandler={handleBookCreation}
            />
            {statusMessage}
        </div>
    );
}
