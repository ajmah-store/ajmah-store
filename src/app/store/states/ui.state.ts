import { Alert } from "../../models/alert.model";
import { State, Selector, StateContext, Action } from "@ngxs/store";
import { CreateAlert, DismissAlert, CreateConfirm, DismissConfirm } from "../actions/ui.actions";
import { HistoryList } from "@arjunatlast/jsds";
import { Confirm } from "../../models/confirm.model";

export interface UIStateModel {
    alert: Alert;
    confirm: Confirm;
}

@State<UIStateModel>({
    name: 'ui',
    defaults: {
        alert: null,
        confirm: null
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


}