function getMaxArrayValueOrNull(array) {
    if (array.every(item => item === null)) {
        return item;
    }
    return Math.max(...array);
}

module.exports = getMaxArrayValueOrNull;
