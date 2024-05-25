export function hasEmptyFields(formData) {
    return Object.entries(formData).some((pair) => !pair[1].trim());
}

export function getWithoutEmptyFields(formData) {
    return Object.fromEntries(
        Object.entries(formData).filter((pair) => pair[1].trim()),
    );
}
