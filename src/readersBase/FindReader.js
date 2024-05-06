import React from 'react';

export const FindReader = () => {
    return (
        <div>
            <form>
                <label>ID:</label><input type='text'/>
                <label>Name:</label><input type='text'/>
                <label>Surname:</label><input type='text'/>
                <label>Phone number:</label><input type='text'/>
                <label>Email:</label><input type='text'/>
            </form>

            <table>
                <thead>
                    <tr>
                        <th><a href='./ReaderPage.js'>ID</a></th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Phone number</th>
                        <th>Email</th>
                        <th>Books amount</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};
