export function removeSymbols(string) {
        return string.trim()
                .replaceAll(',', '')
                .replaceAll('.', '')
                .replaceAll('?', '')
                .replaceAll('!', '')
                .replaceAll('¿', '')
                .replaceAll('¡', '')
}
export function getContainerCoordinates(container) {
        const wordCoords = container.getBoundingClientRect()
        const coords = {
                width: wordCoords.width,
                height: wordCoords.height,
                top: wordCoords.top + window.scrollY - 35,
                left: wordCoords.left + window.scrollX
        }
        return coords
}

export function stringToArray(string) {
        return string.split(' ')
}

export function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
}