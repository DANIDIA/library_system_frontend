import * as React from 'react';

export const LibrarianSearch = () => {
    return (
        <div>
            <form>
                <label>ID:</label><input type='text'/>
                <label>Name:</label><input type='text'/>
                <label>Surname:</label><input type='text'/>
                <label>Phone number:</label><input type='text'/>
                <label>Email:</label><input type='text'/>

                <button>Search</button>
                <button>Show all</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Phone number</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><a href='./Librarian.js'>ID</a></td>
                        <td>Name</td>
                        <td>Surname</td>
                        <td>Phone number</td>
                        <td>Email</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
