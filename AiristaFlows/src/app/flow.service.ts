import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor() { }

  getFlows(){
    return "hello flows"
  }
}
