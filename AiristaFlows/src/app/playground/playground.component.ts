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

  flow = {Triggers: [this.trigger1, this.trigger2], 
    Functions: [this.func1, this.func2, this.func3, this.func4, 
      this.func5, this.func6, this.func7, this.func8]};

  answer = [{1:[3, 4]}, {2: [10]}, {3:[5, 6, 7]}, {6:[8, 9]}]
  tree = new Map<number, number[]>();

  ngOnInit(): void {
    this.tree = this.getTree()
    console.log("map of tree", this.tree)
    console.log("depth: ", this.getTreeDepth(this.flow.Triggers[0].Id))
    console.log("span: ", this.getTreeSpan(this.flow.Triggers[0].Id))

    // const nestedDivs = this.htmlTree()
    // console.log("html", nestedDivs)
    // const flowHeaderDiv = document.querySelector(".flow-header");
    // flowHeaderDiv?.appendChild(nestedDivs);

    console.log(this.getTriggerWidth(1))
  }

  // generates map of flow triggers/branches tree
  getTree() {
    let tree = new Map<number, number[]>();
    const mixed = this.flow.Functions.concat(this.flow.Triggers)

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
  // returns depth for passed trigger
  getTreeDepth(startNode:number): number {
    let maxDepth = 1; 
    var tree = this.tree

    checkChildren(startNode)

    return maxDepth;
    // recursive helper function
    function checkChildren(key:number){
      const children = tree.get(key);
      if (children){
        maxDepth++
        children.forEach((child:number) => {
          checkChildren(child)
        })
      }
    }
  }
  getTreeSpan(startNode:number): number {
    let span = 0; 
    var tree = this.tree

    checkChildren(startNode)

    return span;
    // recursive helper function
    function checkChildren(key:number){
      const children = tree.get(key);
      if (children){
        children.forEach((child:number) => {
          checkChildren(child)
        })
      }else{span++}
    }
  }

  // width of whole flow
  getGridColumns():string{
    let treeWidth = 0
    this.flow.Triggers.forEach((trigger:Trigger)=>{
      treeWidth+=this.getTreeSpan(trigger.Id)
    })
    return `repeat(${treeWidth}, 1fr)`;
  }
  getTriggerWidth(triggerId: number):string{
    let triggerWidth = this.getTreeSpan(triggerId)
    return `span ${triggerWidth}`;
  }

  htmlTree2(){
    //make trigger root nodes first
    this.flow.Triggers.forEach((trigger:Trigger)=>{
      
    })
  }
  

  htmlTree():HTMLElement{
    var tree = this.tree
    const rootDiv = document.createElement("div");
    rootDiv.innerHTML = `
    <div class="trigger">
      <p>Id: ${this.flow.Triggers[0].Id}</p>
      <p>Name: ${this.flow.Triggers[0].Name}</p>
    </div>`
    let currentDiv = rootDiv;

    let depth = this.getTreeDepth(this.flow.Triggers[0].Id)
    if (depth <= 0) {
      throw new Error("Depth should be greater than 0.");
    }

    this.createChild(this.flow.Triggers[0].Id, currentDiv)
    
    return rootDiv;
  }
  createChild(key:number, currentDiv:any){
    const children = this.tree.get(key);
    if (children){
      children.forEach((child:number) => {
        const childDiv = document.createElement('div');
        let func = this.flow.Functions.find((obj:any) => obj.Id == child)
        childDiv.innerHTML = `
        <div class="function">
          <p>Id: ${func?.Id}</p>
          <p>Name: ${func?.Name}</p>
        </div>`
        currentDiv.appendChild(childDiv);
        currentDiv = childDiv;
        this.createChild(child, currentDiv)
      })
    }
  }

  renderObject(object: Trigger | Func) {
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="function">
      <p>Id: ${object.Id}</p>
      <p>Name: ${object.Name}</p>
    </div>`

    document.body.appendChild(div);
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