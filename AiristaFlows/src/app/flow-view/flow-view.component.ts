import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlowListComponent } from '../flow-list/flow-list.component';
import { FlowService } from '../flow.service'
import { ActivatedRoute } from '@angular/router';
import { MqttComponent } from '../configure-trigger/mqtt/mqtt.component';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-flow-view',
  templateUrl: './flow-view.component.html',
  styleUrls: ['./flow-view.component.scss']
})
export class FlowViewComponent implements OnInit {

  // Trigger settings to send back back to Flow-view
  @Output() saveTrigger: EventEmitter<any> = new EventEmitter<any>();

  @Input() flowTrigger?: FlowViewComponent; // selected flow to open
  selectedTrigger: any; 

  flowObject: any;
  jsonFlowsData: any;

  selectedFunction: any;
  executableCreated = "";
  executableLoading = false;

  constructor(
    private flowService: FlowService,
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.flowObject=history.state.flow
    console.log(this.flowObject)
  }

  configureFunction(flowFunction: any){
    //console.log(flowFunction)
    if (this.selectedFunction || this.selectedTrigger){
      this.selectedFunction = undefined
      this.selectedTrigger = undefined
    }else{
      this.selectedFunction = flowFunction
    }
  }

  configureTrigger(flowObject: any){
    const dialogRef: MatDialogRef<MqttComponent> = this.dialog.open(MqttComponent, {
      data: { trigger: flowObject },
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

  createExecutable() {
    this.executableLoading=true;
    this.flowService.createExecutableFlow(this.flowObject.Id).subscribe((data: any) => {
      if (data){ 
        this.executableCreated = data
      }else{
        this.executableCreated = "Error Generating Executable"
      }
      this.executableLoading = false
    });
  }

  handleUpdatedTrigger(updatedTrigger: any){
    //console.log("updated trigger", updatedTrigger)
    this.flowObject.Trigger = updatedTrigger
  }

}
