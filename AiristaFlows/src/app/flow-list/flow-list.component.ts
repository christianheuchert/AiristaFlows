import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FlowService } from '../flow.service'
import { withComponentInputBinding } from '@angular/router';


@Component({
  selector: 'app-flow-list',
  templateUrl: './flow-list.component.html',
  styleUrls: ['./flow-list.component.scss']
})
export class FlowListComponent implements OnInit {

  jsonFlowsData: any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private flowService: FlowService,
    ) { }

  ngOnInit(): void {
    this.flowService.getFlows().subscribe((data: any) => {
      console.log("flow data: ", data)
      this.jsonFlowsData = data;
    });
  }

  onSelect(flow: any){
    //console.log(flow)
    this.router.navigate(['flow-view'], {state: {flow}});
  }

  createFlow(){
    this.router.navigate(['create-flow']);
  }

}
