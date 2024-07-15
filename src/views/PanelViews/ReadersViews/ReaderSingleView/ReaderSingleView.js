import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getReader,
    getReaderBooks,
    returnReaderBook,
} from '../../../../apiOperations';
import { pathsInPanel } from '../../shared';
import { ReaderContext } from '../ReaderContext';
import { getReaderStatusMessage } from '../helper';

export function ReaderSingleView() {
    const navigate = useNavigate();
    const { readerID } = useParams();
    const { readerData, setReaderData } = useContext(ReaderContext);
    const [statusMessage, setStatusMessage] = useState('');
    const [readerBooks, setReaderBooks] = useState();

    const loadReaderData = async () => {
        if (readerData) return;

        const response = await getReader(readerID);

        if (!response.ok) {
            setStatusMessage(getReaderStatusMessage(response));
            return;
        }

        setReaderData(response.data);
    };

    const loadReaderBooks = async () => {
        const response = await getReaderBooks(readerID);

        if (!response.ok) {
            setStatusMessage(getReaderStatusMessage(response));
            return;
        }

        setReaderBooks(response.data);
    };

    useEffect(() => {
        loadReaderData();
        loadReaderBooks();
    }, []);

    const handleReturnBook = async (bookID) => {
        await returnReaderBook(readerID, bookID);
    };

    return (
        <div>
            Name: {readerData.name}
            <br />
            Surname: {readerData.surname}
            <br />
            Phone number: {readerData.phoneNumber}
            <br />
            Email: {readerData.email}
            <br />
            Status: {readerData.status ? 'active' : 'blocked'}
            <br />
            <GivenBooksTable
                returnBookHandler={handleReturnBook}
                books={readerBooks}
            />
            {statusMessage}
            <button
                onClick={() =>
                    navigate(`../${pathsInPanel.UPDATE}/${readerID}`)
                }
            >
                Update
            </button>
        </div>
    );
}

function GivenBooksTable({ returnBookHandler = () => {}, books = [] }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, i) => (
                    <tr key={i}>
                        <td>{book.title}</td>
                        <td>
                            <button onClick={() => returnBookHandler(book.id)}>
                                return
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
