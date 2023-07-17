import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlowService } from '../flow.service'

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.scss']
})
export class CreateFlowComponent implements OnInit{

  createFlowForm!: FormGroup;
  triggerOptions = [""];
  functionOptions = [""];
  config: any;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder,
    private flowService: FlowService,
    ) { }

  ngOnInit(): void {
    this.flowService.getConfig().subscribe((data: any) => {
      console.log("config data", data)
      this.config = data;
      this.triggerOptions = data.Triggers
      this.functionOptions = data.Functions
      });
      this.createFlowForm = this.fb.group({
        Triggers: ["mqtt"],
        Functions: ["consoleLog"],
        })
    }

    onSubmit(){
      console.warn(this.createFlowForm.value);
    }

}
