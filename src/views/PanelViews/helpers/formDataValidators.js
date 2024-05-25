export function hasEmptyFields(formData) {
    return Object.entries(formData).some((pair) => !pair[1].trim());
}
