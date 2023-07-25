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
  func9 = { Id: 11, Name: "func9", Input: 10, Output: "func9"};

  flow = {Triggers: [this.trigger1, this.trigger2], 
    Functions: [this.func1, this.func2, this.func3, this.func4, 
      this.func5, this.func6, this.func7, this.func8, this.func9]};

  answer = [{1:[3, 4]}, {2: [10]}, {3:[5, 6, 7]}, {6:[8, 9]}, {10:[11]}]
  tree = new Map<number, number[]>();
  treeGrid: Array<TreeNode> = [];

  ngOnInit(): void {
    this.tree = this.getTree()
    console.log("map of tree", this.tree)
    console.log("depth: ", this.getTreeDepth(this.flow.Triggers[0].Id))
    console.log("span: ", this.getTreeSpan(this.flow.Triggers[0].Id))

    this.treeGrid = this.calculateTreeGrid()
    console.log("treeGrid: ", this.treeGrid)

    // const nestedDivs = this.htmlTree()
    // console.log("html", nestedDivs)
    // const flowHeaderDiv = document.querySelector(".flow-header");
    // flowHeaderDiv?.appendChild(nestedDivs);

    // console.log(this.getTriggerWidth(1))
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
  // returns depth for given node
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

  calculateTreeGrid(): TreeNode[]{
    // make Grid Array
    var gridArr: Array<TreeNode> = [];
    var gridY = 1 // value for y
    var gridX = 0 // value for x
    var prevTriggerSpan = 0 // width of previous trigger
    // recursive helper function
    const checkChildren = (key:number) => {
      const children = this.tree.get(key);
      if (children){
        children.forEach((child:number) => {
          let newTreeNode: TreeNode = {
            id: child,
            x: gridX,
            y: gridY,
            w: this.getTreeSpan(child)
          }
          gridArr.push(newTreeNode)
          gridX += newTreeNode.w // save row x pos
        })
        gridY++
        gridX = prevTriggerSpan // reset x but keep track of prev trigger tree width
        children.forEach((child:number)=>
        checkChildren(child))
      }else{
        gridX++ // if no children take up one space
      }
    }

    // for each trigger start tree
    this.flow.Triggers.forEach(trigger=>{
      checkChildren(trigger.Id) // start at root
      gridY = 1 // reset height
      prevTriggerSpan = this.getTreeSpan(trigger.Id) // x pos start after prev trigger width
      gridX = prevTriggerSpan
    })
    
    return gridArr
  }




  // set width of flow display grid
  getGridColumns():string{
    let treeWidth = 0 // add width of all root nodes ie triggers
    this.flow.Triggers.forEach((trigger:Trigger)=>{
      treeWidth+=this.getTreeSpan(trigger.Id)
    })
    return `repeat(${treeWidth}, 1fr)`;
  }
  getTriggerWidth(triggerId: number):string{
    let triggerWidth = this.getTreeSpan(triggerId)
    return `span ${triggerWidth}`;
  }
  
  getFunctionColStart(funcId:number):number{
    const node = this.treeGrid.find(node => node.id == funcId )
    if (node){return node.x +1 }
    else{return 0}
  }
  getFunctionRowStart(funcId:number):number{
    const node = this.treeGrid.find(node => node.id == funcId )
    if (node){return node.y +1 }
    else{return 0}
  }
  getFunctionWidth(funcId:number):number{
    const node = this.treeGrid.find(node => node.id == funcId )
    if (node){return node.x + node.w +1}
    else{return 0}
  }

  // htmlTree():HTMLElement{
  //   var tree = this.tree
  //   const rootDiv = document.createElement("div");
  //   rootDiv.innerHTML = `
  //   <div class="trigger">
  //     <p>Id: ${this.flow.Triggers[0].Id}</p>
  //     <p>Name: ${this.flow.Triggers[0].Name}</p>
  //   </div>`
  //   let currentDiv = rootDiv;

  //   let depth = this.getTreeDepth(this.flow.Triggers[0].Id)
  //   if (depth <= 0) {
  //     throw new Error("Depth should be greater than 0.");
  //   }

  //   this.createChild(this.flow.Triggers[0].Id, currentDiv)
    
  //   return rootDiv;
  // }
  // createChild(key:number, currentDiv:any){
  //   const children = this.tree.get(key);
  //   if (children){
  //     children.forEach((child:number) => {
  //       const childDiv = document.createElement('div');
  //       let func = this.flow.Functions.find((obj:any) => obj.Id == child)
  //       childDiv.innerHTML = `
  //       <div class="function">
  //         <p>Id: ${func?.Id}</p>
  //         <p>Name: ${func?.Name}</p>
  //       </div>`
  //       currentDiv.appendChild(childDiv);
  //       currentDiv = childDiv;
  //       this.createChild(child, currentDiv)
  //     })
  //   }
  // }

  // renderObject(object: Trigger | Func) {
  //   const div = document.createElement('div');

  //   div.innerHTML = `
  //   <div class="function">
  //     <p>Id: ${object.Id}</p>
  //     <p>Name: ${object.Name}</p>
  //   </div>`

  //   document.body.appendChild(div);
  // }
  

}

interface TreeNode {
  id: number;
  x: number;
  y: number;
  w: number;
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