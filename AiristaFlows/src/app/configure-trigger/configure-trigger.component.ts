import { Component, OnInit, Input } from '@angular/core';
import { FlowViewComponent } from '../flow-view/flow-view.component';
import { MqttComponent } from './mqtt/mqtt.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-configure-trigger',
  templateUrl: './configure-trigger.component.html',
  styleUrls: ['./configure-trigger.component.scss']
})
export class ConfigureTriggerComponent implements OnInit {

  @Input() flowTrigger?: FlowViewComponent; // selected flow to open
  selectedTrigger: any; 

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.selectedTrigger = this.flowTrigger
  }

  configureTrigger(){
    this.dialog.open(MqttComponent, {
      data: { trigger: this.selectedTrigger },
      height: 'calc(100% - 50px)',
      position: { right: '0px', top: '50px' },
      maxWidth: '100vw',
      width: '40%',
    });
  }

}
