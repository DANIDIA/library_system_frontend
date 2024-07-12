import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryBooks } from '../../../../apiOperations';
import { getWithoutEmptyFields } from '../../helpers';
import { pathsInPanel } from '../../shared';
import { BookContext } from '../BookContext';
import { BookFormComponent } from '../components';
import { getBookStatusMessage } from '../helpers';
import { BookTableComponent } from './components';

export function BookListView() {
    const navigate = useNavigate();
    const { setBookData } = useContext(BookContext);
    const [booksList, setBooksList] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');

    const handleSearch = async (formData) => {
        const valuesToQuery = { ...formData };

        if (formData.authorsIDs.length === 0) {
            delete valuesToQuery.authorsIDs;
        }

        const response = await queryBooks(getWithoutEmptyFields(valuesToQuery));

        if (response.ok) {
            setBooksList(response.data.results);
        } else {
            setStatusMessage(getBookStatusMessage(response));
        }
    };

    const handleClickOnItem = (bookItemData) => {
        setBookData(bookItemData);
        navigate(`../${pathsInPanel.PAGE}/${bookItemData.id}`);
    };

    return (
        <div>
            <BookFormComponent
                submitButtonText='search'
                formSubmitHandler={handleSearch}
            />
            {statusMessage}
            {booksList.length > 0 ? (
                <BookTableComponent
                    booksData={booksList}
                    handleOnItemClick={handleClickOnItem}
                />
            ) : (
                'no results'
            )}
        </div>
    );
}
