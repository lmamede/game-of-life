class Cell {
    constructor(state, oldState, liveNeighbors) {
        this.state = state;
        this.oldState = oldState;
        this.liveNeighbors = liveNeighbors;
    }

    get state(){
        return this._state;
    }

    set state(state){
        return this._state = state;
    }

    get oldState(){
        return this._oldState;
    }

    set oldState(oldState){
        return this._oldState = oldState;
    }

    get liveNeighbors(){
        return this._liveNeighbors;
    }

    set liveNeighbors(liveNeighbors){
        return this._liveNeighbors = liveNeighbors;
    }

    countLiveNeighbors = (grid, x, y) => {
        this._liveNeighbors = 0;
     
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){    
                let col = (x + i + cols) % cols;
                let row = (y + j + rows) % rows;

                this._liveNeighbors+=grid[col][row].oldState;
            }
        }
    
        this._liveNeighbors -= this._oldState;
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
let start = false;
let cellSize = 40;

function setup(){
    createCanvas(innerWidth, innerHeight);
    cols = floor(width/cellSize);
    rows = floor(height/cellSize);
    grid = make2DArray(cols,rows);

    for(let i =0; i<cols; i++){
        for(let j =0; j<rows; j++){
            grid[i][j] = new Cell(0,0);
        }
    }
    
    addEventListener('click', (event) => {
        grid[round(event.clientX/cellSize)][round(event.clientY/cellSize)] = new Cell(floor(random(2)),0); 

    })

    var button = createButton("Start!");
    button.mousePressed(startCircleOfLife)


}

function startCircleOfLife(){
    start = true;
}

function draw(){
    background(255);
    for(let i =0; i<cols; i++){
        for(let j =0; j<rows; j++){
            let x = i * cellSize;
            let y = j * cellSize;
            if(grid[i][j].state == 1){
                fill(0);
                stroke(255);
                rect(x, y, cellSize-1, cellSize-1);        
            }
        }

    }

    //compute next based on grid
    if(start == true){
        for(let i =0; i<cols; i++){
            for(let j =0; j<rows; j++){
                let cell = grid[i][j];

                cell.countLiveNeighbors(grid, i, j);

                //change state
                if(cell.state == 0 && cell.liveNeighbors == 3){
                    cell.oldState = cell.state;
                    cell.state = 1;
                } else if(cell.state == 1 && (cell.liveNeighbors < 2 || cell.liveNeighbors >3)){
                    cell.oldState = cell.state;
                    cell.state = 0;
                } else {
                    cell.oldState = cell.state;
                }
            }
        }
    }
}

