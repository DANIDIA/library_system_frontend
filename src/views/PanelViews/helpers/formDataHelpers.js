export function isFieldEmpty(value) {
    if (value !== 0 && !value) return true;

    if (typeof value === 'string') return !value.trim();
}

export function hasEmptyFields(formData) {
    return Object.entries(formData).some((pair) => isFieldEmpty(pair[1]));
}

export function getWithoutEmptyFields(formData) {
    return Object.fromEntries(
        Object.entries(formData).filter((pair) => isFieldEmpty(pair[1])),
    );
}

export function areNecessaryFieldsEmpty(formData, necessaryFields = []) {
    return Object.entries(formData).some(
        (pair) => necessaryFields.includes(pair[0]) && isFieldEmpty(pair[1]),
    );
}

export function getClearedFields(formData) {
    return Object.fromEntries(
        Object.entries(formData).map((pair) => [pair[0], '']),
    );
}
