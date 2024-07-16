import emailValidator from 'email-validator';
import { parsePhoneNumber } from 'libphonenumber-js';
import React, { useState } from 'react';
import { createReader } from '../../../../apiOperations';
import { areNecessaryFieldsEmpty } from '../../helpers';
import { ReaderFormComponent, readerFormModes } from '../components';
import { getReaderStatusMessage, strictFormValidator } from '../helper';
import { readerNecessaryFields } from '../shared';

export function ReadersCreationView() {
    const [statusMessage, setStatusMessage] = useState('');

    const creationHandler = async (formData, clearForm) => {
        if (!strictFormValidator(formData, setStatusMessage)) return;

        const response = await createReader(formData);

        if (!response.ok) {
            setStatusMessage(getReaderStatusMessage(response));
            return;
        }

        clearForm();
        setStatusMessage('Successfully created');
    };

    return (
        <div>
            <ReaderFormComponent
                submitButtonText='add reader'
                submitHandler={creationHandler}
                mode={readerFormModes.WITHOUT_STATUS}
            />
            {statusMessage}
        </div>
    );
}
