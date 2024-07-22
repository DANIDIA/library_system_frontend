import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryReaders } from '../../../../apiOperations';
import { getWithoutEmptyFields } from '../../helpers';
import { pathsInPanel } from '../../shared';
import { ReaderContext } from '../ReaderContext';
import { ReaderFormComponent } from '../components';
import { getReaderStatusMessage } from '../helper';
import { ReadersTableComponent } from './components';

export function ReadersListView() {
    const navigate = useNavigate();
    const { setReaderData } = useContext(ReaderContext);
    const [readersList, setReadersList] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');

    const handleSearch = async (formData) => {
        const response = await queryReaders(getWithoutEmptyFields(formData));

        if (!response.ok) {
            setStatusMessage(getReaderStatusMessage(response));
            return;
        }

        setReadersList(response.data.results);
    };

    const handleClickOnItem = (readerData) => {
        setReaderData(readerData);
        navigate(`../${pathsInPanel.PAGE}/${readerData.id}`);
    };

    return (
        <div>
            <ReaderFormComponent
                submitButtonText='search'
                submitHandler={handleSearch}
            />
            <ReadersTableComponent
                onItemClick={handleClickOnItem}
                readers={readersList}
            />
            {statusMessage}
        </div>
    );
}
