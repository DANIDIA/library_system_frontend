import React from 'react';

export function ReadersTableComponent({
    readers = [],
    onItemClick = () => {},
}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {readers.map((data, i) => (
                    <ReaderTableItem
                        key={i}
                        readerData={data}
                        onClick={onItemClick}
                    />
                ))}
            </tbody>
        </table>
    );
}

function ReaderTableItem({ key, readerData, onClick = () => {} }) {
    return (
        <tr key={key} onClick={() => onClick(readerData)}>
            <td>{readerData.name}</td>
            <td>{readerData.surname}</td>
            <td>{readerData.phoneNumber}</td>
            <td>{readerData.email}</td>
            <td>{readerData.status}</td>
        </tr>
    );
}
