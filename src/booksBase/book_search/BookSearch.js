import React from 'react';

export function BookSearch() {
    return (
        <div>
            <form>
                <labe>Title:</labe><input type='text'/>
                <label>Author:</label><input type='text'/>
                <label>Search in all departments</label><input type='checkbox'/>
                <select>
                    <option value='any'></option>
                    <option value='*some department name*'></option>
                </select>
                <button>search</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Amount</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href='./BookPage.js'>Title</a></td>
                        <td>Author</td>
                        <td>Amount</td>
                        <th>Department</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
