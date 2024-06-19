import { getStatusMessageFunction } from '../../../../helpers';

export const getDepartmentStatusMessage = getStatusMessageFunction({
    400: 'There are no workers or books in department with requested params',
    403: 'Your session is ended, please login again',
    404: 'Some referencing data was invalid',
});
