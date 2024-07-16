import emailValidator from 'email-validator';
import { parsePhoneNumber } from 'libphonenumber-js';
import { areNecessaryFieldsEmpty } from '../../helpers';
import { readerNecessaryFields } from '../shared';

export function strictFormValidator(formData, setStatusMessage) {
    if (areNecessaryFieldsEmpty(formData, readerNecessaryFields)) {
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
