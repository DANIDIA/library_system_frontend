import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReader, updateReader } from '../../../../apiOperations';
import { pathsInPanel } from '../../shared';
import { ReaderContext } from '../ReaderContext';
import { ReaderFormComponent } from '../components';
import { getReaderStatusMessage, strictFormValidator } from '../helper';

export function ReaderEditView() {
    const navigate = useNavigate();
    const { readerID } = useParams();
    const { readerData, setReaderData } = useContext(ReaderContext);
    const [statusMessage, setStatusMessage] = useState('');

    const loadReaderData = async () => {
        if (readerData) return;

        const response = await getReader(readerID);

        if (!response.ok) {
            setStatusMessage(getReaderStatusMessage(response));
            return;
        }

        setReaderData(response.data);
    };

    useEffect(() => loadReaderData, []);

    const handleUpdate = async (formData) => {
        const requestData = { ...formData, status: !!formData.status };
        if (!strictFormValidator(requestData, setStatusMessage)) return;

        const response = await updateReader(readerID, requestData);

        if (!response.ok) {
            setStatusMessage(getReaderStatusMessage(response));
            return;
        }
        setReaderData(requestData);
        navigate(`../${pathsInPanel.PAGE}/${readerID}`);
    };

    return (
        <div>
            <ReaderFormComponent
                submitButtonText='update'
                submitHandler={handleUpdate}
                initialValues={readerData}
            />
            <button
                onClick={() => navigate(`../${pathsInPanel.PAGE}/${readerID}`)}
            >
                back
            </button>
            <br />
            {statusMessage}
        </div>
    );
}
