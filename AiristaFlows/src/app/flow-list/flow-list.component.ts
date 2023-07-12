import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flow-list',
  templateUrl: './flow-list.component.html',
  styleUrls: ['./flow-list.component.scss']
})
export class FlowListComponent implements OnInit {

  jsonFlowsData: any;
  selectedFlow: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    try{
      this.http.get(`/assets/flows/flows.json`).subscribe((data: any) => {
        this.jsonFlowsData = data;
      });      
    }catch(error){
      console.error(error);
      this.jsonFlowsData = undefined;
    }
  }

  openFlow(flow: any){
    this.router.navigate(['flow-view'], flow);
  }

  onSelect(flow: any){
    console.log(flow)
    if (this.selectedFlow && this.selectedFlow.Name==flow.Name){
      this.selectedFlow = undefined
    }else{
      this.selectedFlow = flow
    }
  }

}
