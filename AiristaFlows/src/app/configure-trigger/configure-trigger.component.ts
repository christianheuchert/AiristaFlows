import { Component, OnInit, Input } from '@angular/core';
import { FlowViewComponent } from '../flow-view/flow-view.component';

@Component({
  selector: 'app-configure-trigger',
  templateUrl: './configure-trigger.component.html',
  styleUrls: ['./configure-trigger.component.scss']
})
export class ConfigureTriggerComponent implements OnInit {

  @Input() flowTrigger?: FlowViewComponent; // selected flow to open
  selectedTrigger: any; 

  constructor() { }

  ngOnInit(): void {
    this.selectedTrigger = this.flowTrigger
  }

}
