import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    deleteBook,
    getAmountDetailsInSingleDepartment,
    getBookAmountDetails,
    getBookAuthors,
    giveBookToReader,
} from '../../../../apiOperations';
import { SelectResourceComponent } from '../../../../components';
import { SessionContext } from '../../../../contexts';
import { panelsPaths } from '../../../../layouts';
import { roles } from '../../../../shared';
import { getPathToSelectionForm } from '../../helpers';
import { pathsInPanel } from '../../shared';
import { BookContext } from '../BookContext';
import { getBookStatusMessage } from '../helpers';

export function BookSingleView() {
    const navigate = useNavigate();
    const location = useLocation();
    const { bookID } = useParams();
    const { userData } = useContext(SessionContext);
    const { bookData, setBookData } = useContext(BookContext);
    const [additionalData, setAdditionalData] = useState({});
    const [readerToGetBook, setReaderToGetBook] = useState();
    const [departmentToGetBook, setDepartmentToGetBook] = useState();
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

    const getSavedValues = () => {
        if (Object.hasOwn(sessionStorage, location.pathname)) {
            return JSON.parse(sessionStorage.getItem(location.pathname));
        }

        return {};
    };
    const saveReaderAndDepartment = () => {
        sessionStorage.setItem(
            location.pathname,
            JSON.stringify({
                readerToGetBook,
                departmentToGetBook,
            }),
        );
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

    const handleGiveBook = async () => {
        const response = await giveBookToReader(
            bookID,
            readerToGetBook.id,
            userData.role === roles.ADMIN
                ? departmentToGetBook.id
                : userData.departmentID,
        );

        if (!response.ok) {
            setStatusMessage(getBookStatusMessage(response));
        }
    };

    const handleDepartmentChange = (newDepartment) => {
        console.log('Change Department');
        console.log(getSavedValues());
        setDepartmentToGetBook(newDepartment);
        setReaderToGetBook(getSavedValues()?.readerToGetBook);
    };

    const handleReaderChange = (newReader) => {
        console.log('Change reader');
        console.log(getSavedValues());
        setReaderToGetBook(newReader);
        setDepartmentToGetBook(getSavedValues()?.departmentToGetBook);
    };

    return (
        <div>
            Book title: {bookData?.title}
            <br />
            Authors: {bookData?.authorsData?.map((data) => data.name)}
            <br />
            Total amount: {additionalData?.totalAmount}
            <br />
            Given amount: {additionalData?.givenAmount}
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
            <SelectResourceComponent
                fieldName='select reader'
                pathToSelect={getPathToSelectionForm(panelsPaths.READERS_PANEL)}
                onChange={handleReaderChange}
                onRedirect={saveReaderAndDepartment}
                valueName='readerToGiveBook'
            />
            {userData.role === roles.ADMIN && (
                <SelectResourceComponent
                    fieldName='select department'
                    pathToSelect={getPathToSelectionForm(
                        panelsPaths.DEPARTMENTS_PANEL,
                    )}
                    onChange={handleDepartmentChange}
                    onRedirect={saveReaderAndDepartment}
                    valueName='departmentToGiveBook'
                />
            )}
            <button onClick={handleGiveBook}>get to reader</button>
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
