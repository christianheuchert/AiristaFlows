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

  constructor() { }

  ngOnInit(): void {
    this.flowObject=this.flow
    console.log(this.flowObject)
  }

}
