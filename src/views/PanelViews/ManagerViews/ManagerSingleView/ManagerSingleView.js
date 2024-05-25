import React, { useContext } from 'react';
import { SessionContext } from '../../../../contexts';
import { roles } from '../../../../shared';

export function ManagerSingleView() {
    const { userData } = useContext(SessionContext);

    return (
        <div>
            {userData.role === roles.ADMIN ? (
                <div>
                    Name: <br />
                    Surname: <br />
                    Phone number: <br />
                    Email: <br />
                    Login: <br />
                    Password: <br />
                    <button>Update</button>
                    <button>Delete</button>
                </div>
            ) : (
                'You don not have permission'
            )}
        </div>
    );
}
