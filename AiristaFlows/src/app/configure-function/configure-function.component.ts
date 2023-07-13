import { Component, OnInit, Input } from '@angular/core';
import { FlowViewComponent } from '../flow-view/flow-view.component';

@Component({
  selector: 'app-configure-function',
  templateUrl: './configure-function.component.html',
  styleUrls: ['./configure-function.component.scss']
})
export class ConfigureFunctionComponent implements OnInit {

  @Input() flowFunction?: FlowViewComponent; // selected flow to open
  selectedFunction: any; 

  constructor() { }

  ngOnInit(): void {
    this.selectedFunction = this.flowFunction
  }

}
