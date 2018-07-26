import { Alert } from "../../models/alert.model";
import { Confirm } from "../../models/confirm.model";

//alert
export class CreateAlert {
    static readonly type = "[UI] CreateAlert";
    constructor(public payload: Alert) {}
}

export class DismissAlert {
    static readonly type = "[UI] DismissAlert";
    constructor(public payload: Alert) {}
}

//confirm
export class CreateConfirm {
    static readonly type = "[UI] CreateConfirm";
    constructor(public payload: Confirm) {}
}

export class DismissConfirm {
    static readonly type = "[UI] DismissConfirm";
    constructor(public payload: Confirm) {}
}

//cart
export class OpenCart {
    static readonly type = "[UI] OpenCart";
    constructor() {}
}

export class CloseCart {
    static readonly type = "[UI] CloseCart";
    constructor() {}
}