import { Address } from "./address.model";

/**
 * Represents an order in ajmah
 */

 export class Order {
    id?: any;
    uid: any;
    amount: number;
    currency: string;
    state: string;
    address: Address;
    items: {product_id: any, quantity: number}[];
    createdAt: number;
    invoice_id?: string;
    payment_id?: string;
 }