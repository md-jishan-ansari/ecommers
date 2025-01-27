export const truncateText = (Str: string) => {
    if (Str.length < 25) return Str;

    return Str.substring(0, 25) + "...";
}