import React from 'react';

export function BookTableComponent({
    booksData = [],
    handleOnItemClick = () => {},
}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {booksData.map((data, i) => (
                    <BookListItem
                        data={data}
                        onClick={handleOnItemClick}
                        key={i}
                    />
                ))}
            </tbody>
        </table>
    );
}

function BookListItem({ data, onClick }) {
    return (
        <tr onClick={() => onClick(data)}>
            <td>{data.title}</td>
        </tr>
    );
}
