import * as React from 'react';

export function UsersSearch() {
    return (
        <div>
            <form>
                <label>ID:</label><input type='text'/>
                <label>Name:</label><input type='text'/>
                <label>Surname:</label><input type='text'/>
                <label>Phone number:</label><input type='text'/>
                <label>Department:</label><input type='text'/>
                <label>Role</label><input type='text'/>
                <label>Email</label><input type='text'/>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Phone number</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href='./User.js'>ID</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
