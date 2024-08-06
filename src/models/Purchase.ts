import { Card } from "./Card";

export interface Purchase {
    purchaseId?: number,
    itemName: string,
    category: string,
    amount: string,
    purchaseDate?: Date,
    scheme?: string,
    paymentTerm?: number,
    ìsSplit?: boolean,
    cutoffDate?: number,
    isPaidOff?: boolean,
    card?: Card
}