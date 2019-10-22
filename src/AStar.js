import NodeElement from './Node.js'

class AStar {

  constructor(start, end, grid){
    this.grid = grid
    this.matrixLenght = this.grid.length
    this.nodes =[]
    for(let i=0;i<grid.length;i++){
      for(let j=0;j<grid[0].length;j++){
        if(i==start[0] && j==start[1]){
          this.start = new NodeElement(i, j, grid[i][j].difficulty, grid[i][j].wall, this)
          this.nodes.push(this.start)
        }  else if(i==end[0] && j==end[1]){
          this.end = new NodeElement(i, j, grid[i][j].difficulty, grid[i][j].wall, this)
          this.nodes.push(this.end)
        } else {
        this.nodes.push(new NodeElement (i,j,grid[i][j].difficulty,grid[i][j].wall,this))
        }
      }
    }
    this.openQueue = [this.start]
    this.alreadyChecked = []

    this.optimalPath=[]
  }

  startAlgorithm(){
    this.openQueue[0].heuristicCalculation(this.openQueue[0])

    while(this.openQueue.length>0 ){
      if(this.openQueue[0]===this.end){
        break
      }
      let neighbours = this.openQueue[0].neighboursCalculation(this.openQueue)
      let queue = this.openQueue
      this.alreadyChecked.push(queue.shift())
      let newQueue = queue.concat(neighbours)
      let sortedNeighbours = newQueue.sort(function(a, b){return a.heuristic - b.heuristic})
      this.openQueue = sortedNeighbours
    }
    if(this.openQueue.length !== 0){this.retrieveOptimalPath(this.openQueue[0])}
  }


  retrieveOptimalPath(node){
    this.optimalPath.push(node)
    if(node.through!==this.start){
      this.retrieveOptimalPath(node.through)
    }else{
      this.optimalPath.push(this.start)
    }
  }



  eucledianDistance(node){
    return Math.sqrt(Math.pow(Math.abs(node.row-this.end.row),2)+Math.pow(Math.abs(node.col-this.end.col),2))
  }

}
export default AStar
