import { RecurringSource, RECUR_TYPES, Transaction } from "./misc/AddSource";

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

export function getLastMonthsTransactions(o: Transaction[], n: number): Transaction[] {
    let currentDate: Date = new Date();
    let currentMonth: number = currentDate.getMonth();
    let sixMonthsAgo: Date = new Date(currentDate);
    sixMonthsAgo.setMonth(currentMonth - n);
    return o.filter(t => t.date >= sixMonthsAgo && t.date <= currentDate);
}

export function previousSixTransaction(o: Transaction[]): {[month: string]: number}  {
    // Filter the last 6 months of transactions, getting months from the previous year if necessary
    var filteredTransactions: Transaction[] = getLastMonthsTransactions(o, 6);
    // Create a dictionary of the form {month: amount}
    var monthDict: {[month: string]: number} = {};
    for (var i = 0; i < 6; i++) {
        monthDict[filteredTransactions[i].date.toLocaleString('default', { month: 'long' })] = 0;
    }
    // Sum the amount of each transaction for each month
    for (var i = 0; i < 6; i++) {
        monthDict[filteredTransactions[i].date.toLocaleString('default', { month: 'long' })] += filteredTransactions[i].amount;
    }
    // Return an array of the amounts
    return monthDict;
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
