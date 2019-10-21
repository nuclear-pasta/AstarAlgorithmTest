import React from 'react';
import AStar from './AStar.js'


//FIND WAY TO IMPORT MATRIX AS STATE

import './App.css';

class App extends React.Component {
  state = {
    gridDimension: 5,
    grid: [],
    walls: [],
    start: '',
    end: '',
    total: '',
    error: '',
    clickMode: 'start'
  };

  componentDidMount(){
    this.setGridState()
  }

  setGridState = (num=5) => {
    let grid=new Array(num)
    for(let i=0;i<grid.length;i++){
      grid[i]= new Array(num).fill({wall:false, difficulty: 1, color: 'white'})
    }
    return this.setState({
      grid
    })
  }

  setToggleCase = (e, stateKey, color) => {
    let diff = stateKey== "start" ? 0 : 1
    let squarePosition = e.currentTarget.id.split("-")
    Promise.resolve(this.cleanGrid(this.state[stateKey],{wall:false, difficulty: 1, color: 'white'}))
    .then(() => this.placeSquare(squarePosition, {wall:false, difficulty: diff, color: color}, stateKey))

  }

  setMultipleSquareCase = (e, stateKey, color) => {
    let wallBoolean = stateKey === "walls" ? true : false
    let difficulty = stateKey === "walls" ? Infinity : 1
    let squarePosition = e.currentTarget.id.split("-")
    this.placeSquares(squarePosition, {wall: wallBoolean, difficulty: difficulty, color: color})

  }



  cleanGrid = (stateCondition,object) => {
     if(!!stateCondition){
      let grid =  this.state.grid
      grid[stateCondition[0]][stateCondition[1]] = object
      return this.setState({
        grid
      })
    }
    return
  }

  substituteSquare = (positionArray, object, key) => {
    let grid =  this.state.grid
    grid[positionArray[0]][positionArray[1]] = object
    return this.setState({
      grid,
      [key]: positionArray
    })
  }

  substituteSquares = (positionArray, object) => {
    let grid =  this.state.grid
    grid[positionArray[0]][positionArray[1]] = object
    return this.setState({
      grid,
    })
  }



  placeSquare = (squarePosition, object, stateKey) => {
    this.substituteSquare(squarePosition,object,stateKey)
  }

  placeSquares = (squarePosition, object) => {

    this.substituteSquares(squarePosition,object)
  }

  increaseDifficulty = (e,color) => {
    let squarePosition = e.currentTarget.id.split("-")
    let increasedDifficulty = Number(e.currentTarget.innerText) + 1
    let condition = !this.state.grid[squarePosition[0]][squarePosition[1]].wall
    if(condition){this.substituteSquares(squarePosition,{wall: false, difficulty: increasedDifficulty, color: color})}

  }




  handleClick = (e,clickMode,array=[]) => {
    let color
    let wall
    switch(clickMode){
      case "start":
        this.setToggleCase(e,"start","green")
        break
      case "end":
        this.setToggleCase(e,"end","red")
        break
      case "free":
        this.setMultipleSquareCase(e,"free","white")
        break
      case "wall":
        this.setMultipleSquareCase(e,"walls","black")
        break
      case "increase":
        this.increaseDifficulty(e,"white")
        break
        default:
        return

    }
  }




  renderGrid = () => {
    let grid = this.state.grid
    return <div>{grid.map((row,i)=><div style={{display: 'flex'}}>{row.map((element, j)=><div data-difficulty={1} id={`${i}-${j}`} onClick={(e)=>this.handleClick(e,this.state.clickMode,[i,j])} style={{height: "100px", width: '100px', borderStyle: 'solid', backgroundColor: element.color, fontSize:'50px', lineHeight: '100px', textAlign: 'center'}}>{element.difficulty==0 ? '' : element.difficulty }</div>)}</div>)}</div>
  }

  reset = async () => {
    await this.setGridState(0)
    this.setGridState(this.state.gridDimension)
  }






  selectMode = (e) =>{
    this.setState({
      clickMode: e.target.name
    })
  }

  handleChange = (e) => {
    this.setState({
      gridDimension: Number(e.target.value)
    })
  }

  optimalPath = () => {
    if(!!this.state.start && !!this.state.end){
      this.setState({
        error: false
      })
    }else{
      return this.setState({
        error: true
      })
    }
    let aStarInstance = new AStar (this.state.start,this.state.end, this.state.grid)
     aStarInstance.startAlgorithm()
     let optimalPath = aStarInstance.optimalPath
     let grid =  this.state.grid
     let sum = 0
     optimalPath.forEach(node=>{
       sum += node.difficulty
       let difficulty = grid[node.row][node.col].difficulty
       grid[node.row][node.col] = {color: 'yellow', difficulty: difficulty, wall: false}
     } )
     return this.setState({
       grid,
       total: sum
     })

  }




  render() {
    let buttonStyle={
      margin: '20px',
      height: '50px',
      width: '100px',
      backgroundColor: 'blue',
      borderRadius: '5px',
      fontSize: '14px',
      color: 'white',
      fontWeight: 'bold'
    }
    //Assign random walls start end and difficulties
    return (
      <div style={{margin: '30px'}}>
      <div style={{display: 'flex'}}>
        <button style={buttonStyle} name="start" onClick={(e)=>this.selectMode(e)}> Select Start </button>
        <button style={buttonStyle} name="end" onClick={(e)=>this.selectMode(e)}> Select End </button>
        <button style={buttonStyle} name="wall" onClick={(e)=>this.selectMode(e)}> Select Wall </button>
        <button style={buttonStyle} name="free" onClick={(e)=>this.selectMode(e)}> Free </button>
        <button style={buttonStyle} name="increase" onClick={(e)=>this.selectMode(e)}> Increase difficulty </button>
        <button style={buttonStyle} onClick={()=>this.optimalPath()}> Calculate Optimal Path </button>

      </div>
      <p> Press one of the button to select the option and click on the grid to add, remove or increase the difficulty of the element in the maze </p>
      {this.state.error ? <div> Insert a Start and End for the Path </div> : null}

      {this.renderGrid()}
      {!!this.state.total ? <div> Total difficulty: {this.state.total} </div> : null}
      <p>Change the matrix size and press the Reset Button</p>
      <input name="dimension" style={{height: '40px', fontSize: '20px'}} value={this.state.gridDimension} onChange={(e)=>this.handleChange(e)}/>
      <button style={buttonStyle} name="reset" onClick={()=>this.reset()}> Reset / New Grid </button>
      </div>
    );
  }
}



export default App;
