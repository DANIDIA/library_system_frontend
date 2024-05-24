export function getDepartmentStatusMessage(statusCode) {
    if (statusCode) {
        if (statusCode >= 500) {
            return 'Oops... some problems with server';
        } else {
            return departmentStatusMessages[statusCode];
        }
    } else {
        return 'Oops... Some problems with internet connection or server. Please, check your connection';
    }
}

const departmentStatusMessages = Object.freeze({
    400: 'There are workers or books in department',
    403: 'Your session is ended, please login again',
    404: 'Some referencing data was invalid',
});
