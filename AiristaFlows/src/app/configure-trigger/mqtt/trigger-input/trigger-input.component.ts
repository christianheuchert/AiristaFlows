import { Component, OnInit, Inject, Input  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-trigger-input',
  templateUrl: './trigger-input.component.html',
  styleUrls: ['./trigger-input.component.scss']
})
export class TriggerInputComponent implements OnInit {

  @Input() inputValue: any;
  inputForm!: FormGroup;
  keys:string[] = [];

  constructor(
    public dialogRef: MatDialogRef<TriggerInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    console.log('the data -', this.data)

    this.inputForm = this.fb.group({
        Input: ['', [Validators.required]],
        Keys: ['', [Validators.required]]
      })
    ;
  }

  addKeyToList(key: string) {
    this.keys.push(key);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(){
    console.warn(this.inputForm.value);
  }

}
