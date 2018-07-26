import { Alert } from "../../models/alert.model";
import { State, Selector, StateContext, Action } from "@ngxs/store";
import { CreateAlert, DismissAlert, CreateConfirm, DismissConfirm, OpenCart, CloseCart } from "../actions/ui.actions";
import { HistoryList } from "@arjunatlast/jsds";
import { Confirm } from "../../models/confirm.model";

export interface UIStateModel {
    alert: Alert;
    confirm: Confirm;
    cartIsOpen: boolean;
}

@State<UIStateModel>({
    name: 'ui',
    defaults: {
        alert: null,
        confirm: null,
        cartIsOpen: false
    }
})
export class UIState {

    @Selector()
    static getAlert(state: UIStateModel) {
        return state.alert;
    }

    @Selector()
    static getConfirm(state: UIStateModel) {
        return state.confirm;
    }

    @Selector()
    static getCartIsOpen(state: UIStateModel) {
        return state.cartIsOpen;
    }

    //create alert
    @Action(CreateAlert)
    createAlert(ctx: StateContext<UIStateModel>, {payload}: CreateAlert) {

        ctx.patchState({
            alert: payload
        });

    }

    //dismiss alert
    @Action(DismissAlert)
    dismissAlert(ctx: StateContext<UIStateModel>, {payload}: DismissAlert) {

        ctx.patchState({
            alert: null
        })

    }

    //create confirm
    @Action(CreateConfirm)
    createConfirm(ctx: StateContext<UIStateModel>, {payload}: CreateConfirm) {

        ctx.patchState({
            confirm: payload
        });

    }

    //dismiss confirm
    @Action(DismissConfirm)
    dismissConfirm(ctx: StateContext<UIStateModel>, {payload}: DismissConfirm) {

        ctx.patchState({
            confirm: null
        });
        
    }

    //open cart
    @Action(OpenCart)
    openCart(ctx: StateContext<UIStateModel>, action: OpenCart) {

        ctx.patchState({
            cartIsOpen: true
        });

    }

    //close cart
    @Action(CloseCart)
    closeCart(ctx: StateContext<UIStateModel>, action: CloseCart) {

        ctx.patchState({
            cartIsOpen: false
        })
        
    }


}