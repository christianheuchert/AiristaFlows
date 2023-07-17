import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private http: HttpClient) { }

  getFlows(){
    return this.http.get<any>("http://localhost:8080/flows", {} );
  }

  createExecutableFlow(name: string){
    return this.http.get<any>(
      `http://localhost:8080/flowExec` +
      `/${name}`
    , {} );
  }

}
