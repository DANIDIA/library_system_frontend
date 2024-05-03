import React from 'react';

export function GiveBook() {
    return (
        <div>
            <form>
                <label>ID:</label><input type='text'/>
                <label>Name:</label><input type='text'/>
                <label>Surname:</label><input type='text'/>
                <label>Phone number:</label><input type='text'/>
                <label>Email:</label><input type='email'/>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Phone number</th>
                        <th>Email</th>
                        <th>Books amount</th>
                        <th>Give book</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}
