import React from 'react';

export function AddBook(){
    return (
        <div>
            <form>
                <label>Title: </label><input type='text'/>
                <label>Author: </label><input type='text'/>
                <label>Amount</label><input type='text'/>
            </form>
        </div>
    );
}
