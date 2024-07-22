import React, { useState } from 'react';
import { createReader } from '../../../../apiOperations';
import { accountStatuses } from '../../shared';
import { ReaderFormComponent, readerFormModes } from '../components';
import { getReaderStatusMessage, strictFormValidator } from '../helper';

export function ReadersCreationView() {
    const [statusMessage, setStatusMessage] = useState('');

    const creationHandler = async (formData, clearForm) => {
        const requestValues = { ...formData, status: accountStatuses.ACTIVE };

        if (!strictFormValidator(requestValues, setStatusMessage)) return;

        const response = await createReader(requestValues);

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
