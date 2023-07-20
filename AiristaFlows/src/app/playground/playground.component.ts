import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit{

  trigger1 = { Id: 1, Name: "trigger1", Input: 0, Output: "trigger1" };
  trigger2 = { Id: 2, Name: "trigger2", Input: 0, Output: "trigger 2" };
  func1 = { Id: 3, Name: "func1", Input: 1, Output: "func1" };
  func2 = { Id: 4, Name: "func2", Input: 1, Output: "func2" };
  func3 = { Id: 5, Name: "func3", Input: 3, Output: "func3" };
  func4 = { Id: 6, Name: "func4", Input: 3, Output: "func4" };
  func5 = { Id: 7, Name: "func5", Input: 3, Output: "func5"};
  func6 = { Id: 8, Name: "func6", Input: 6, Output: "func6" };
  func7 = { Id: 9, Name: "func7", Input: 6, Output: "func7"};
  func8 = { Id: 10, Name: "func8", Input: 2, Output: "func8"};

  flow= {Triggers: [this.trigger1, this.trigger2], 
    Functions: [this.func1, this.func2, this.func3, this.func4, 
      this.func5, this.func6, this.func7, this.func8]};

  answer = [{1:[3, 4]}, {2: [10]}, {3:[5, 6, 7]}, {6:[8, 9]}]

  ngOnInit(): void {
    var tree = this.getTree(this.flow)
    console.log(tree)
  }

  getTree(flow: Flow) {
    const mixed = flow.Functions.concat(flow.Triggers)

    let tree = new Map<number, number[]>();

    mixed.forEach(element => {
      mixed.forEach(another => {
        if(element.Id == another.Input){
          let valArr = tree.get(element.Id)
          if (valArr){
            valArr?.push(another.Id)
            tree.set(element.Id, valArr)
          }else{ tree.set(element.Id, [another.Id]) }
          
        }
      });
    });
    return tree
  }
  

}

interface Trigger {
  Id: number;
  Name: string;
  Input: number;
  Output: string;
}

interface Func {
  Id: number;
  Name: string;
  Input: number;
  Output: string;
}

interface Flow {
  Triggers: Trigger[];
  Functions: Func[];
}