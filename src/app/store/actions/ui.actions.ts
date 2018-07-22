import { Alert } from "../../models/alert.model";

//alert
export class CreateAlert {
    static readonly type = "[UI] CreateAlert";
    constructor(public payload: Alert) {}
}

export class DismissAlert {
    static readonly type = "[UI] DismissAlert";
    constructor(public payload: Alert) {}
}