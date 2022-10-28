export function getRandomColor() {
    const RED = Math.floor(Math.random() * 256)
    const GREEN = Math.floor(Math.random() * 256)
    const BLUE = Math.floor(Math.random() * 256)
    return `rgb(${RED}, ${GREEN}, ${BLUE})`
}