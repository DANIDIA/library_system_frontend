import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    deleteBook,
    getAmountDetailsInSingleDepartment,
    getBookAmountDetails,
    getBookAuthors,
} from '../../../../apiOperations';
import { SessionContext } from '../../../../contexts';
import { pathsInPanel } from '../../shared';
import { BookContext } from '../BookContext';
import { getBookStatusMessage } from '../helpers';

export function BookSingleView() {
    const navigate = useNavigate();
    const { bookID } = useParams();
    const { userData } = useContext(SessionContext);
    const { bookData, setBookData } = useContext(BookContext);
    const [additionalData, setAdditionalData] = useState({});
    const [statusMessage, setStatusMessage] = useState();

    const loadBookAuthorsDataAndBookData = async function () {
        let newBookData = { ...bookData };
        const bookAuthorsResponse = await getBookAuthors(bookID);

        if (!bookAuthorsResponse.ok) {
            setStatusMessage(getBookStatusMessage(bookAuthorsResponse));
            return;
        }

        if (!bookData) {
            const bookDataResponse = await getBookAuthors(bookID);

            if (!bookDataResponse.ok) {
                setStatusMessage(getBookStatusMessage(bookDataResponse));
                return;
            }

            newBookData = { ...bookDataResponse.data };
        }

        setBookData({ ...newBookData, authorsData: bookAuthorsResponse.data });
    };

    const loadAdditionData = async () => {
        const bookAmountDetailsResponse = await getBookAmountDetails(bookID);

        if (!bookAmountDetailsResponse.ok) {
            setStatusMessage(getBookStatusMessage(bookAmountDetailsResponse));
            return;
        }

        if (!userData.departmentID) {
            setAdditionalData({ ...bookAmountDetailsResponse.data });
            return;
        }

        const bookAmountDetailsInUserDepartmentResponse =
            await getAmountDetailsInSingleDepartment(
                bookID,
                userData.departmentID,
            );

        if (!bookAmountDetailsResponse.ok) {
            setStatusMessage(
                getBookStatusMessage(bookAmountDetailsInUserDepartmentResponse),
            );
            return;
        }

        setAdditionalData({
            ...bookAmountDetailsResponse.data,
            inUserDepartment: bookAmountDetailsInUserDepartmentResponse.data,
        });
    };

    useEffect(() => {
        loadBookAuthorsDataAndBookData();
        loadAdditionData();
    }, []);

    const handleDelete = async () => {
        const deleteResponse = await deleteBook(bookID);

        if (!deleteResponse.ok) {
            setStatusMessage(getBookStatusMessage(deleteResponse));
            return;
        }

        navigate('..');
        setBookData(null);
    };

    return (
        <div>
            Book title: {bookData.title}
            <br />
            Authors: {bookData.authorsData?.map((data) => data.name)}
            <br />
            Total amount: {additionalData.totalAmount}
            <br />
            Given amount: {additionalData.givenAmount}
            <br />
            {userData.departmentID && (
                <div>
                    In current department:
                    <br />
                    total amount: {additionalData.inUserDepartment.totalAmount}
                    given amount: {additionalData.inUserDepartment.givenAmount}
                    available amount:
                    {additionalData.inUserDepartment -
                        additionalData.inUserDepartment.givenAmount}
                </div>
            )}
            <br />
            <button>get to reader</button>
            <br />
            <button
                onClick={() => navigate(`../${pathsInPanel.UPDATE}/${bookID}`)}
            >
                edit
            </button>
            <br />
            <button onClick={handleDelete}>delete</button>
            <br />
            {statusMessage}
        </div>
    );
}
