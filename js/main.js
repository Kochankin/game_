const DIRECTIONS = {
    UP: 0,
    RIGHT: 90,
    DOWN: 180,
    LEFT: 270
}

const KEY_CODES = {
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN',
    37: 'LEFT'
}

const CELL_SIZE = 100;

const matrix = [
    [0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0], 
]

const STEP = 1;
const BUTTON = document.querySelector('button');
const wrapper = document.querySelector('.wrapper');
const mazeCanvas = document.querySelector('.maze');
var ctx = mazeCanvas.getContext('2d');

class Player {
    constructor(playerDiv, cellSize) {
      this.col = 0;
      this.row = 0;
      this.cellSize = cellSize;
      this.playerDiv = playerDiv; // html-element which we are manipulating
      this.direction = DIRECTIONS.RIGHT; // initially the player faces right
      this.generatePlayer();
    }
    generatePlayer(){
        // size of player is equal to the cell size
        this.playerDiv.style.width = this.cellSize + 'px'; 
        this.playerDiv.style.height = this.cellSize + 'px'; 
    }
  }
  
class Maze {
    constructor(matrix, cellSize, wrapper, mazeCanvas) {
        this.matrix = matrix;
        this.rows = matrix.length;
        this.cols = matrix[0].length;
        this.cellSize = cellSize; 
        this.height = this.cols * this.cellSize;
        this.width = this.rows * this.cellSize;
        this.wrapper = wrapper;
        this.mazeCanvas = mazeCanvas;
        this.generateCanvas();
    } 

    generateCanvas(){
        this.wrapper.style.width = this.width + 'px';
        this.wrapper.style.height = this.height + 'px';
        this.mazeCanvas.width = this.width;
        this.mazeCanvas.height = this.height;
        this.drawGrid();
        this.drawMaze();
    }

    drawGrid(){
        ctx.strokeRect(0, 0, this.width, this.height); // draw maze border
        for (let i = this.cellSize; i < this.width; i+=this.cellSize){ // draw vertical lines
            ctx.fillRect(i, 0, 1, this.width);
        }  
       for (let j = this.cellSize; j < this.height; j +=this.cellSize){ // draw horizontal lines
            ctx.fillRect(0, j, this.height, 1);
        } 
    }

    drawMaze(){
        this.matrix.forEach((row, rowI) => {
            row.forEach((cell, cellI) =>{
                if (cell){
                    const x = cellI * this.cellSize; 
                    const y = rowI * this.cellSize;
                    ctx.fillRect(x, y, this.cellSize, this.cellSize);
                }
            });
        });
    }
}
  
class Game {
    constructor(player, maze, step){
        this.step = step;
        this.player = player;
        this.playerDiv = player.playerDiv;
        this.maze = maze;
        this.isWall = false;
        this.addListener(); // init listener
        this.moveByTimer();
    }

    addListener(){
        document.addEventListener('keydown', this.moveByKeys.bind(this));  
    }

    getMoveHandlers(){
        return {
            UP () {
                if ((this.player.row - this.step) >= 0) {
                    this.player.row -= this.step;
                } else { 
                    this.isWall = true;
                }
                this.player.direction = DIRECTIONS.UP;
            },
            DOWN () {
                if ((this.player.row + this.step) < this.maze.rows) {
                    this.player.row += this.step;
                } else { this.isWall = true;}
                this.player.direction = DIRECTIONS.DOWN;
            },
            LEFT () {
                if ((this.player.col - this.step) >= 0) {
                    this.player.col -= this.step;
                } else { this.isWall = true;}
                this.player.direction = DIRECTIONS.LEFT;
            },
            RIGHT () {
                if ((this.player.col + this.step) < this.maze.cols) {
                    this.player.col += this.step;
               } else { this.isWall = true;}
                this.player.direction = DIRECTIONS.RIGHT;
            }
        }
    }

    moveByKeys(event){
        const moveHandlers = this.getMoveHandlers();
        const direction = KEY_CODES[event.keyCode.toString()]; //get direction 'UP'/'DOWN'/..
        moveHandlers[direction].call(this); // call handler depending on direction
        this.updateView(); 
    }

    moveByTimer(){
        this.makeSingleMove();
        if (this.isWall) { // check whether the player faces the wall
            this.rotateLeft(); // if there is a wall, make a rotate
        }
        this.updateView();
        setTimeout(this.moveByTimer.bind(this), 1000);
    }

    makeSingleMove(){
        const moveHandlers = this.getMoveHandlers();
        const directionEntries = Object.entries(DIRECTIONS);
        // get name of the current direction: it's [0] element within the only filtered entry
        const direction = directionEntries.filter(entry => 
            entry[1] === this.player.direction)[0][0];
        moveHandlers[direction].call(this);
    }

    rotateLeft(){
        if (this.player.direction === DIRECTIONS.LEFT){
            this.player.direction = DIRECTIONS.UP; // if you add 90, we get 360, while there are constants for 0, 90, 180, 270 only
        }  else {
            this.player.direction += 90;
        }
        this.isWall = false; // the barrier was eliminated
    }

    updateView(){
        this.playerDiv.style.left = this.player.col * this.maze.cellSize + 'px'; // move right/left
        this.playerDiv.style.top = this.player.row * this.maze.cellSize + 'px'; //move up/down
        this.playerDiv.style.transform = `rotate(${this.player.direction}deg)`; // update the direction of facing
    }
}

const player = new Player(document.querySelector('.player'), CELL_SIZE);
const maze = new Maze(matrix, CELL_SIZE, wrapper, mazeCanvas);
const game = new Game(player, maze, STEP, BUTTON);


 