import emailValidator from 'email-validator';
import { parsePhoneNumber } from 'libphonenumber-js';
import React, { useState } from 'react';
import { createReader } from '../../../../apiOperations';
import { areNecessaryFieldsEmpty } from '../../helpers';
import { ReaderFormComponent, readerFormModes } from '../components';
import { getReaderStatusMessage } from '../helper';
import { readerNecessaryFields } from '../shared';

export function ReadersCreationView() {
    const [statusMessage, setStatusMessage] = useState('');

    const validateFormData = (formData) => {
        if (areNecessaryFieldsEmpty(formData, readerNecessaryFields)) {
            setStatusMessage('Some of necessary fields are empty fields');
            return false;
        }

        try {
            if (!parsePhoneNumber(formData.phoneNumber, 'PL').isValid()) {
                setStatusMessage('Phone number is incorrect');
                return false;
            }
        } catch {
            setStatusMessage('Phone number is incorrect');
            return false;
        }

        if (!emailValidator.validate(formData.email)) {
            setStatusMessage('Email is incorrect');
            return false;
        }

        return true;
    };
    const creationHandler = async (formData, clearForm) => {
        if (!validateFormData) return;

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
