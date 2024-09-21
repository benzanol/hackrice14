import { RecurringSource, RECUR_TYPES } from "./misc/AddSource";


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
