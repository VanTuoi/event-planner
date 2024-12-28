/**
 *
 * @param text original string
 * @param maxLength maximum number of characters
 * @returns converted string
 */
export const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, maxLength / 2);
    const end = text.slice(-maxLength / 2);
    return `${start}...${end}`;
};
