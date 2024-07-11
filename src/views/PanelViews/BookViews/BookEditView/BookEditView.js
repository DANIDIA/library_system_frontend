import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBook } from '../../../../apiOperations';
import { hasChangedValues, hasEmptyFields } from '../../helpers';
import { pathsInPanel } from '../../shared';
import { BookContext } from '../BookContext';
import { BookFormComponent } from '../components';
import { getBookStatusMessage } from '../helpers';

export function BookEditView() {
    const navigate = useNavigate();
    const { bookID } = useParams();
    const { bookData, setBookData } = useContext(BookContext);
    const [statusMessage, setStatusMessage] = useState('');

    const validateFormData = (formData) => {
        if (hasEmptyFields(formData)) {
            setStatusMessage('There are empty fields!');
            return false;
        }
        if (!hasChangedValues(bookData, formData)) {
            setStatusMessage('Values was not change');
            return false;
        }

        return true;
    };

    const handleUpdateData = async (formData) => {
        if (!validateFormData(formData)) return;

        const response = await updateBook(bookID, formData);

        if (response.ok) {
            setBookData(formData);
            navigate(`../${pathsInPanel.PAGE}/${bookID}`);
        } else {
            setStatusMessage(getBookStatusMessage(response));
        }
    };

    return (
        <div>
            <BookFormComponent
                submitButtonText='save changes'
                formSubmitHandler={handleUpdateData}
                initialValues={bookData}
            />
            <button onClick={() => navigate('..')}>back</button>
            {statusMessage}
        </div>
    );
}
