class Cell {
    constructor(state, nextState) {
        this.state = state;
        this.nextState = nextState;
    }

    getState = () => {
        return this.state;
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

    console.table(grid);

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

    let next = make2DArray(cols, rows);

    //compute next based on grid
    for(let i =0; i<cols; i++){
        for(let j =0; j<rows; j++){
            let state = grid[i][j].getState();
            //count live neighbors
            let sum =0;
            neighbors = countLiveNeighbors(grid, i, j);

            //change state
            if(state == 0 && neighbors == 3){
                next[i][j] =  new Cell(1,0);
            } else if(state == 1 && (neighbors < 2 || neighbors >3)){
                next[i][j] = new Cell(0,0);
            } else {
                next[i][j] = grid[i][j];
            }
        }

    }

    grid = next;

}


function countLiveNeighbors(grid, x, y){
    sum = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){    
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            sum+=grid[col][row].state;
        }
    }

    sum -=grid[x][y].state;
    return sum;
}