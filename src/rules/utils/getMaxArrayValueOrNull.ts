function getMaxArrayValueOrNull(array: number[]) {
    if (array.every(item => item === null)) {
        return null;
    }
    return Math.max(...array);
}

export default getMaxArrayValueOrNull;
