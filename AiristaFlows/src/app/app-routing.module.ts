import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFlowComponent } from './create-flow/create-flow.component';
import { FlowListComponent } from './flow-list/flow-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlowViewComponent } from './flow-view/flow-view.component';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
  {
    path: 'flow-list',
    component: FlowListComponent,
    data: {flow: {}},
  },
  {
    path: 'flow-view',
    component: FlowViewComponent,
    data: {},
  },
  {
    path: 'create-flow',
    component: CreateFlowComponent,
    data: {},
  },
  {
    path: 'playground',
    component: PlaygroundComponent,
    data: {},
  },
  { path: '', redirectTo: '/flow-list', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
