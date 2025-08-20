function getColorFromLetter(title) {
    if (!title || typeof title !== 'string' || title.length === 0) {
        // fallback color
        return 'hsl(220, 15%, 95%)';
    }

    const first = title.trim()[0];
    const code = first.charCodeAt(0); // ASCII / Unicode code of first character
    const hue = (code * 137) % 360; // pseudo-random hue based on char
    return `hsl(${hue}, 70%, 50%)`; // HSL color string
}

export { getColorFromLetter };
