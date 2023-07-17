import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TriggerInputComponent } from './trigger-input/trigger-input.component';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.scss']
})
export class MqttComponent implements OnInit {

  triggerForm!: FormGroup;
  trigger: any;
  selectedTrigger: any; 
  inputValue:any;
  variableOptions= ["String", "Object", "Number"];
  protocol=["ws", "mqtt"]

  constructor(
    public dialogRef: MatDialogRef<MqttComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.trigger = this.data.trigger
    this.triggerForm = this.fb.group({
        Name: [this.trigger.Name, [Validators.required]],
        Description: [this.trigger.Description],
        Input: [this.trigger.Input],
        Output: [this.trigger.Output],
        Settings: this.fb.group({
          Host: [this.trigger.Settings.Host],
          Username: [this.trigger.Settings.Username],
          Password: [this.trigger.Settings.Password],
          Port: [this.trigger.Settings.Port],
          Protocol: [this.trigger.Settings.Protocol],
          Topic: [this.trigger.Settings.Topic],
        })
        
      });
  }

  revertValues() {
    this.triggerForm.patchValue({
      name: this.trigger.Name,
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  configureInput(){
    this.dialog.open(TriggerInputComponent, {
      data: { data: this.inputValue },
      height: 'calc(100% - 60px)',
      position: { right: '0px', top: '60px' },
      maxWidth: '100vw',
      width: '40%',
    });
  }

  onSubmit(){
    console.warn(this.triggerForm.value);
  }

}
