import { getStatusMessageFunction } from '../../../helpers';

export const getLoginStatusMessage = getStatusMessageFunction({
    401: 'Login or password is incorrect',
    403: 'User is blocked',
});
