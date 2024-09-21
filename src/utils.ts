export function capitalizeFirst(str: string): string {
    return str.split(" ").map(s => s[0].toUpperCase() + s.substring(1)).join(" ");
}
