import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import { UIState } from './states/ui.state';
import { CartState } from './states/cart.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      UIState,
      CartState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  exports: [
    NgxsModule,
    NgxsLoggerPluginModule,
    NgxsReduxDevtoolsPluginModule
  ]
})
export class StoreModule { 

}
