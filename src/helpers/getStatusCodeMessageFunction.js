export function getStatusMessageFunction(statusCodesMessagesEnum) {
    return (statusCode) => {
        if (statusCode) {
            if (statusCode >= 500) {
                return 'Oops... some problems with server';
            } else {
                return statusCodesMessagesEnum[statusCode];
            }
        } else {
            return 'Oops... Some problems with internet connection or server. Please, check your connection';
        }
    };
}
