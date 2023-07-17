import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlowService } from '../flow.service'

@Component({
  selector: 'app-flow-list',
  templateUrl: './flow-list.component.html',
  styleUrls: ['./flow-list.component.scss']
})
export class FlowListComponent implements OnInit {

  jsonFlowsData: any;
  selectedFlow: any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private flowService: FlowService,
    ) { }

  ngOnInit(): void {
    this.flowService.getFlows().subscribe((data: any) => {
      console.log(data)
      this.jsonFlowsData = data;
    });
  }

  onSelect(flow: any){
    console.log(flow)
    if (this.selectedFlow){
      this.selectedFlow = undefined
    }else{
      this.selectedFlow = flow
    }
  }

  createFlow(){
    this.router.navigate(['create-flow'])
  }

}
