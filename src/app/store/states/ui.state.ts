import { Alert } from "../../models/alert.model";
import { State, Selector, StateContext, Action } from "@ngxs/store";
import { CreateAlert, DismissAlert } from "../actions/ui.actions";
import { HistoryList } from "@arjunatlast/jsds";

export interface UIStateModel {
    alert: Alert
}

@State<UIStateModel>({
    name: 'ui',
    defaults: {
        alert: null
    }
})
export class UIState {

    @Selector()
    static getAlert(state: UIStateModel) {
        return state.alert;
    }

    //alert
    @Action(CreateAlert)
    createAlert(ctx: StateContext<UIStateModel>, {payload}: CreateAlert) {

        ctx.patchState({
            alert: payload
        });

    }

    //alert
    @Action(DismissAlert)
    dismissAlert(ctx: StateContext<UIStateModel>, {payload}: DismissAlert) {

        ctx.patchState({
            alert: null
        })

    }
}