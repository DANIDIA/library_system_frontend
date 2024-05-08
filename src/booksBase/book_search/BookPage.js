import React from 'react';

export function BookPage() {
    return (
        <div>
            <from>
                <label>Title:</label>
                <input type='text' />
                <label>Author:</label>
                <input type='text' />
                <label>Amount in the department:</label>
                <input type='text' />
                <label>Given amount:</label>
                <label>Total amount:</label>
                <button>Change data</button>
            </from>
            <a href='./GiveBook.js'>Give book</a>
        </div>
    );
}
