import { Component, OnInit, Input } from '@angular/core';
import { FlowListComponent } from '../flow-list/flow-list.component';


@Component({
  selector: 'app-flow-view',
  templateUrl: './flow-view.component.html',
  styleUrls: ['./flow-view.component.scss']
})
export class FlowViewComponent implements OnInit {

  @Input() flow?: FlowListComponent; // selected flow to open
  flowObject: any;

  selectedFunction: any;
  selectedTrigger: any;

  constructor() { }

  ngOnInit(): void {
    this.flowObject=this.flow
    console.log(this.flowObject)
  }

  configureFunction(flowFunction: any){
    console.log(flowFunction)
    if (this.selectedFunction || this.selectedTrigger){
      this.selectedFunction = undefined
      this.selectedTrigger = undefined
    }else{
      this.selectedFunction = flowFunction
    }
  }

  configureTrigger(flowTrigger: any){
    console.log(flowTrigger)
    if (this.selectedTrigger || this.selectedFunction){
      this.selectedTrigger = undefined
      this.selectedFunction = undefined
    }else{
      this.selectedTrigger = flowTrigger
    }
  }

}
