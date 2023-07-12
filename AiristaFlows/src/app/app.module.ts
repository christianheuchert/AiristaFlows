import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowViewComponent } from './flow-view/flow-view.component';
import { SelectTriggerComponent } from './select-trigger/select-trigger.component';
import { ConfigureTriggerComponent } from './configure-trigger/configure-trigger.component';
import { ConfigureFunctionComponent } from './configure-function/configure-function.component';
import { SelectFunctionComponent } from './select-function/select-function.component';
import { FlowListComponent } from './flow-list/flow-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FlowViewComponent,
    SelectTriggerComponent,
    ConfigureTriggerComponent,
    ConfigureFunctionComponent,
    SelectFunctionComponent,
    FlowListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
