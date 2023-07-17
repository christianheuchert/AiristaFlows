import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.scss']
})
export class MqttComponent implements OnInit {

  triggerForm!: FormGroup;
  trigger: any;
  variableOptions= ["String", "Object", "Number"];
  protocol=["ws", "mqtt"]

  constructor(
    public dialogRef: MatDialogRef<MqttComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
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

  onSubmit(){
    console.warn(this.triggerForm.value);
  }

}
