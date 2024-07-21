import { Card } from "./Card";

export interface Purchase {
    purchaseId?: number,
    itemName: string,
    category: string,
    amount: number,
    purchaseDate: string,
    scheme?: string,
    paymentTerm?: number,
    ìsSplit?: boolean,
    cutoffDate?: number,
    isPaidOff?: boolean,
    card?: Card
}