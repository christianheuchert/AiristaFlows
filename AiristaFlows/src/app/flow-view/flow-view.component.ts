import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlowListComponent } from '../flow-list/flow-list.component';
import { FlowService } from '../flow.service'
import { ActivatedRoute } from '@angular/router';
import { MqttComponent } from '../configure-trigger/mqtt/mqtt.component';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-flow-view',
  templateUrl: './flow-view.component.html',
  styleUrls: ['./flow-view.component.scss']
})
export class FlowViewComponent implements OnInit {

  // Trigger settings to send back back to Flow-view
  @Output() saveTrigger: EventEmitter<any> = new EventEmitter<any>();

  @Input() flowTrigger?: FlowViewComponent; // selected flow to open
  selectedTrigger: any; 

  flowObject: any;
  jsonFlowsData: any;

  tree = new Map<number, number[]>();
  treeGrid: Array<TreeNode> = [];

  executableCreated = "";
  executableLoading = false;

  constructor(
    private flowService: FlowService,
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.flowObject=history.state.flow
    console.log(this.flowObject)

    this.tree = this.getTree()
    console.log("map of tree", this.tree)

    this.treeGrid = this.calculateTreeGrid()
    console.log("treeGrid: ", this.treeGrid)
  }

  configureFunction(){

  }

  configureTrigger(flowObject: any){
    const dialogRef: MatDialogRef<MqttComponent> = this.dialog.open(MqttComponent, {
      data: { trigger: flowObject },
      height: 'calc(100% - 60px)',
      position: { right: '0px', top: '60px' },
      maxWidth: '100vw',
      width: '40%',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      // Handle the data received from the dialog
      if (result) {
        // Perform actions with the result data
        this.selectedTrigger = result
        this.saveTrigger.emit(this.selectedTrigger)
      }
    });
  }

  createExecutable() {
    this.executableLoading=true;
    this.flowService.createExecutableFlow(this.flowObject.Id).subscribe((data: any) => {
      if (data){ 
        this.executableCreated = data
      }else{
        this.executableCreated = "Error Generating Executable"
      }
      this.executableLoading = false
    });
  }

  handleUpdatedTrigger(updatedTrigger: any){
    //console.log("updated trigger", updatedTrigger)
    this.flowObject.Trigger = updatedTrigger
  }

  // generates map of flow triggers/branches tree
  getTree() {
    let tree = new Map<number, number[]>();
    const mixed = this.flowObject.Functions.concat(this.flowObject.Triggers)

    mixed.forEach((element:any) => {
      mixed.forEach((another:any) => {
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
  // getTreeDepth(startNode:number): number {
  //   let maxDepth = 1; 
  //   var tree = this.tree
  //   checkChildren(startNode)
  //   return maxDepth;
  //   // recursive helper function
  //   function checkChildren(key:number){
  //     const children = tree.get(key);
  //     if (children){
  //       maxDepth++
  //       children.forEach((child:number) => {
  //         checkChildren(child)
  //       })
  //     }
  //   }
  // }
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
    this.flowObject.Triggers.forEach((trigger:any)=>{
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
    this.flowObject.Triggers.forEach((trigger:any)=>{
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

}

// Node class for flow functions
interface TreeNode {
  id: number;
  x: number;
  y: number;
  w: number;
}