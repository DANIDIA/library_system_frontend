import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { managerContext } from '../../ManagerViews/ManagerContext';
import { pathsInPanel } from '../../shared';

export function UserTableItem({ userData }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setManagerData } = useContext(managerContext);

    const handleItemClick = () => {
        if (location.state) {
            navigate(location.state.pathToReturn, {
                state: { selectedData: userData },
            });
        } else {
            setManagerData(userData);
            navigate(`../${pathsInPanel.PAGE}/${userData.id}`);
        }
    };

    return (
        <tr onClick={handleItemClick}>
            <td>{userData.name}</td>
            <td>{userData.surname}</td>
            <td>{userData.phoneNumber}</td>
            <td>{userData.email}</td>
            <td>{userData.departmentID || 'no department'}</td>
            <td>{userData.status ? 'active' : 'blocked'}</td>
        </tr>
    );
}
