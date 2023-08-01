import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlowService } from '../flow.service'
import { TRIGGERSFUNCTIONS } from '../../assets/Triggers-Functions/Triggers-Functions'

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.scss']
})
export class CreateFlowComponent implements OnInit{

  createFlowForm!: FormGroup;
  triggerOptions: string[] = [];
  functionOptions = [""];
  config: any;

  triggersToAdd: string[] = [];
  functionsToAdd: string[] = [];

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
        Name: "Name",
        Description: "Description",
        Trigger: "",
        Function: "",
        })
    }

    addTrigger(){ 
      if (this.createFlowForm.value.Trigger == ""){return}
      this.triggersToAdd.push(this.createFlowForm.value.Trigger)
      console.log(this.triggersToAdd)
    }
    addFunction(){ 
      if (this.createFlowForm.value.Function == ""){return}
      this.functionsToAdd.push(this.createFlowForm.value.Function)
      console.log(this.functionsToAdd)

    }

    onSubmit(){
      // console.warn(this.createFlowForm.value);
      var newFlow = TRIGGERSFUNCTIONS['flow'];
      newFlow.Name = this.createFlowForm.value.Name;
      newFlow.Description = this.createFlowForm.value.Description;
      
      for (var trigger of this.triggersToAdd) { // triggers added to flow
        newFlow.Triggers.push(TRIGGERSFUNCTIONS[trigger])
      }
      for (var functionx of this.functionsToAdd) { // fucntions added to flow
        newFlow.Functions.push(TRIGGERSFUNCTIONS[functionx])
      }
      
      // Update Id's 
      var currentId = +this.config.CurrentId
      newFlow.Id = ""+ (currentId + 1)
      currentId++
      for (var trig of newFlow.Triggers){
        trig.Id = ""+ (currentId + 1)
        currentId++
      }
      for (var func of newFlow.Functions){
        func.Id = ""+ (currentId + 1)
        currentId++
      }


      console.log("crazy new flow", newFlow)
    }

}
