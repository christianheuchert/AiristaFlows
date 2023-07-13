import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.scss']
})
export class MqttComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MqttComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
