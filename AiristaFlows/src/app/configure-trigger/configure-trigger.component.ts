import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { FlowViewComponent } from '../flow-view/flow-view.component';
import { MqttComponent } from './mqtt/mqtt.component';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-configure-trigger',
  templateUrl: './configure-trigger.component.html',
  styleUrls: ['./configure-trigger.component.scss']
})
export class ConfigureTriggerComponent implements OnInit {

  // Trigger settings to send back back to Flow-view
  @Output() saveTrigger: EventEmitter<any> = new EventEmitter<any>();

  @Input() flowTrigger?: FlowViewComponent; // selected flow to open
  selectedTrigger: any; 

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.selectedTrigger = this.flowTrigger
  }

  configureTrigger(){
    const dialogRef: MatDialogRef<MqttComponent> = this.dialog.open(MqttComponent, {
      data: { trigger: this.selectedTrigger },
      height: 'calc(100% - 60px)',
      position: { right: '0px', top: '60px' },
      maxWidth: '100vw',
      width: '40%',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      // Handle the data received from the dialog
      if (result) {
        // Perform actions with the result data
        this.selectedTrigger = result
        this.saveTrigger.emit(this.selectedTrigger)
      }
    });
  }

}
