class NodeElement {

  constructor(row, col, difficulty, isWall, aStarInstance){
    this.row = row
    this.col = col
    this.wall = isWall
    this.difficulty = difficulty
    this.through = ''
    this.heuristic = Infinity
    this.eucledianDistance = Infinity
    this.difficultySums = ''
    this.aStar = aStarInstance
    this.neighbours=[]
  }



  heuristicCalculation(node) {
    this.through=node
    this.eucledianDistance = this.aStar.eucledianDistance(this)
    //difficultySums bug
    let difficultySums
    difficultySums = this.difficulty + Number(node.difficultySums)
    if( this.difficultySums === '' ) {
      this.difficultySums = difficultySums
      this.through=node
    }else if(this.difficultySums >  difficultySums){
      this.difficultySums = difficultySums
      this.through=node
    }else{

    }


    return this.heuristic = this.eucledianDistance + this.difficultySums
  }

  neighboursCalculation(openQueue){
    let neighbours = []
    let enqueuedNode
    let newNode

    if(this.row < this.aStar.matrixLenght-1) {
      enqueuedNode = openQueue.find(node=>node.row===this.row+1 && node.column===this.col)
      if(!enqueuedNode){
        newNode = this.aStar.nodes.find(node=>(node.row===this.row+1 && node.col===this.col))
        if(newNode.wall===false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode) ) {
          newNode.heuristicCalculation(this)
          neighbours.push(newNode)
        }
      }else{
      enqueuedNode.heuristicCalculation(this)
      }
    }
    if(this.col < this.aStar.matrixLenght-1) {
      enqueuedNode = openQueue.find(node=>node.row===this.row && node.col===this.col+1)
      if(!enqueuedNode){
        newNode = this.aStar.nodes.find(node=>(node.row===this.row && node.col===this.col+1))
        if(newNode.wall===false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode) ){
          newNode.heuristicCalculation(this)
          neighbours.push(newNode)
        }
      }else{
      enqueuedNode.heuristicCalculation(this)
      }
    }
    if(this.row > 0) {
      enqueuedNode = openQueue.find(node=>node.row===this.row-1 && node.col===this.col )
      if(!enqueuedNode){
        newNode = this.aStar.nodes.find(node=>(node.row===this.row-1 && node.col===this.col))
        if(newNode.wall===false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode) ){
          newNode.heuristicCalculation(this)
          neighbours.push(newNode)
        }
      }else{
      enqueuedNode.heuristicCalculation(this)
      }
    }
    if(this.col > 0) {
      enqueuedNode = openQueue.find(node=>node.row===this.row && node.col===this.col-1)
      if(!enqueuedNode){
        newNode = this.aStar.nodes.find(node=>(node.row===this.row && node.col===this.col-1))
        if(newNode.wall===false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode) ){
          newNode.heuristicCalculation(this)
          neighbours.push(newNode)
        }
      }else{
      enqueuedNode.heuristicCalculation(this)
      }
    }
    return neighbours

  }




}
export default NodeElement
