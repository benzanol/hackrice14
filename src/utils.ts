import { RecurringSource, RECUR_TYPES } from "./misc/AddSource";

export function dollarsPerMonth(r: RecurringSource): number {
    switch (r.period) {
        case "daily": return r.amount * 30;
        case "weekly": return r.amount * (30 / 7);
        case "monthly": return r.amount;
        case "yearly": return r.amount / 12;
    }
}

export function dollarsPerWeek(r: RecurringSource): number {
    return dollarsPerMonth(r) * (7 / 30);
}


export function partitionRecurring(rs: RecurringSource[]): {[t: string]: RecurringSource[]} {
    return Object.fromEntries(
        Object.keys(RECUR_TYPES).map(t => [
            t,
            rs.filter(r => r.type == t)
            // Sort in decreasing order
                .sort((a,b) => b.amount - a.amount),
        ])
    );
}


export function dollarString(amount: number): string {
    let str = amount.toFixed(2);

    while (true) {
        const match = str.match(RegExp(/(.*[0-9])([0-9]{3}[,.].*)/));
        if (match == null) break;
        str = match[1] + "," + match[2];
    }
    if (str.endsWith(".00")) {
        str = str.substring(0, str.length-3);
    }
    return "$" + str;
}
