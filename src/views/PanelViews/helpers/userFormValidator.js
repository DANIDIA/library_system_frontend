import emailValidator from 'email-validator';
import { parsePhoneNumber } from 'libphonenumber-js';
import { necessaryFields } from '../shared';
import { areNecessaryFieldsEmpty } from './formDataHelpers';

export function userFormValidator(formData, setStatusMessage) {
    if (areNecessaryFieldsEmpty(formData, necessaryFields)) {
        setStatusMessage('Some of necessary fields are empty fields');
        return false;
    }

    try {
        if (!parsePhoneNumber(formData.phoneNumber, 'PL').isValid()) {
            setStatusMessage('Phone number is incorrect');
            return false;
        }
    } catch {
        setStatusMessage('Phone number is incorrect');
        return false;
    }

    if (!emailValidator.validate(formData.email)) {
        setStatusMessage('Email is incorrect');
        return false;
    }

    return true;
}
