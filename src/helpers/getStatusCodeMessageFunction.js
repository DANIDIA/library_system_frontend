export function getStatusMessageFunction(statusCodesMessagesEnum) {
    return ({ status, message }) => {
        if (status) {
            if (Object.hasOwn(statusCodesMessagesEnum, status)) {
                return statusCodesMessagesEnum[status];
            }

            return message;
        } else {
            return 'Oops... Some problems with internet connection or server. Please, check your connection';
        }
    };
}
