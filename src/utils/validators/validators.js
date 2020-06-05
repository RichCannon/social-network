export const required = (value) => {
    return value ? undefined : 'Field is required';
}

export const maxLength = (length) => {
    return (value) => {
        if(!value) return undefined;
        return value.length > length ? `Max length is ${length}` : undefined;
    }
}