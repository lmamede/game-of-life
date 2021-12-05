class Cell {
    constructor(state, oldState) {
        this.state = state;
        this.oldState = oldState;
    }

    getState = () => {
        return this.state;
    };

    getOldState = () => {
        return this.oldState;
    };
}

function make2DArray(cols, rows){
    let arr = new Array(cols);
    for (let i = 0; i< arr.length; i++){
        arr[i] = new Array(rows);
    }

    return arr;
}

let grid;
let cols;
let rows;
let resolution = 40;

function setup(){
    createCanvas(600, 400);
    cols = width/resolution;
    rows = height/resolution;
    grid = make2DArray(cols,rows);
    for(let i =0; i<cols; i++){
        for(let j =0; j<rows; j++){
            grid[i][j] = new Cell(floor(random(2)),0); 
            
        }

    }
}


function draw(){
    background(0);
    for(let i =0; i<cols; i++){
        for(let j =0; j<rows; j++){
            let x = i * resolution;
            let y = j * resolution;
            if(grid[i][j].getState() == 1){
                fill(255);
                stroke(0);
                rect(x, y, resolution-1, resolution-1);        
            }
        }

    }

    //compute next based on grid
    for(let i =0; i<cols; i++){
        for(let j =0; j<rows; j++){
            let cell = grid[i][j];
            //count live neighbors
            let sum =0;
            neighbors = countLiveNeighbors(grid, i, j);

            //change state
            if(cell.getState() == 0 && neighbors == 3){
                cell.oldState = cell.state;
                cell.state = 1;
            } else if(cell.getState() == 1 && (neighbors < 2 || neighbors >3)){
                cell.oldState = cell.state;
                cell.state = 0;
            } else {
                cell.oldState = cell.state;
            }
        }
    }
}


function countLiveNeighbors(grid, x, y){
    sum = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){    
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            sum+=grid[col][row].getOldState();
        }
    }

    sum -=grid[x][y].getOldState();
    return sum;
}