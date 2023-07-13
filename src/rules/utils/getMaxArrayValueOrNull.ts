function getMaxArrayValueOrNull(array: any[]) {
    if (array.every(item => item === null)) {
        return null;
    }
    return Math.max(...array);
}

export default getMaxArrayValueOrNull;
