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
import { MqttComponent } from './configure-trigger/mqtt/mqtt.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TriggerInputComponent } from './configure-trigger/mqtt/trigger-input/trigger-input.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CreateFlowComponent } from './create-flow/create-flow.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlaygroundComponent } from './playground/playground.component';


@NgModule({
  declarations: [
    AppComponent,
    FlowViewComponent,
    SelectTriggerComponent,
    ConfigureTriggerComponent,
    ConfigureFunctionComponent,
    SelectFunctionComponent,
    FlowListComponent,
    MqttComponent,
    TriggerInputComponent,
    CreateFlowComponent,
    PageNotFoundComponent,
    PlaygroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
