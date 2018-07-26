import { Product } from "../../models/product.model";

export class AddToCart {
    static readonly type = "[CART] AddToCart";
    constructor(public product: Product, public quantity: number) {}
}

export class RemoveFromCart {
    static readonly type = "[CART] RemoveFromCart";
    constructor(public key: string) {}
}

export class ChangeCount {
    static readonly type = "[CART] ChangeCount";
    constructor(public key: string, public count: number) {}
}