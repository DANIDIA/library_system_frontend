import React from 'react';

function App() {
    return (
        <div>
            <form>
                <label>Login: </label><input type='text' name='login' />
                <label>Password: </label><input type='password' name='password'/>
            </form>
            <a href='./librarian/Librarian.js'>Login as librarian</a>
            <a href='./manager/Manager.js'>Login as manager</a>
            <a href='./administrator/Administrator.js'>Login as admin</a>
        </div>
    );
}

export default App;
