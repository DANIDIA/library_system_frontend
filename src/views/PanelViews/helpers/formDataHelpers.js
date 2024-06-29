export function isFieldEmpty(value) {
    if (value !== 0 && !value) return true;

    if (typeof value === 'string') return !value.trim();
}

export function hasEmptyFields(formData, unnecessaryFields = []) {
    return Object.entries(formData).some(
        (pair) => !unnecessaryFields.includes(pair[0]) && isFieldEmpty(pair[1]),
    );
}

export function hasChangedValues(oldValues, newValues) {
    return Object.entries(newValues).some(
        (pair) => pair[1] !== oldValues[pair[0]],
    );
}

export function getWithoutEmptyFields(formData) {
    return Object.fromEntries(
        Object.entries(formData).filter((pair) => !isFieldEmpty(pair[1])),
    );
}

export function areNecessaryFieldsEmpty(formData, necessaryFields = []) {
    return Object.entries(formData).some(
        (pair) => necessaryFields.includes(pair[0]) && isFieldEmpty(pair[1]),
    );
}

export function getEmptyFields(formData) {
    return Object.fromEntries(
        Object.entries(formData).map((pair) => [pair[0], '']),
    );
}
