const [UP_DIRECTION, RIGHT_DIRECTION, DOWN_DIRECTION, LEFT_DIRECTION] = [0, 90, 180, 270];
const [UP_KEY, RIGHT_KEY, DOWN_KEY, LEFT_KEY] = [38, 39, 40, 37];
const [COLS_COUNT, ROWS_COUNT, CELL_SIZE] = [7, 7, 100];
const STEP = 1;


class Player {
    constructor(playerDiv) {
      this.col = 0;
      this.row = 0;
      this.playerDiv = playerDiv; // html-element which we are manipulating
      this.direction = RIGHT_DIRECTION; // initially the player faces right
    }
  }
  
  class Maze {
    constructor(cols, rows, cellSize) {
      this.cols = cols;
      this.rows = rows;
      this.cellSize = cellSize; 
    } 
}
  
class Game {
    constructor(player, maze, step){
        this.step = step;
        this.player = player;
        this.playerDiv = player.playerDiv;
        this.maze = maze;
        this.addListener(); // init listeners
    }

    addListener(){
        document.addEventListener('keydown', this.move.bind(this));  
    }

     move(event){
        if (event.keyCode === UP_KEY){
            this.moveUp();
        } else if (event.keyCode === DOWN_KEY){
            this.moveDown();
        } else if (event.keyCode === LEFT_KEY){
            this.moveLeft();
        } else if (event.keyCode === RIGHT_KEY){
            this.moveRight();
        }
        this.setStyle(); // update the view
    }

    moveUp (){
        if ((this.player.row - this.step) >= 0) {
            this.player.row -= this.step;
        }
        this.player.direction = UP_DIRECTION;
    }

     moveDown (){
        if ((this.player.row + this.step) < this.maze.rows) {
            this.player.row += this.step;
        }
        this.player.direction = DOWN_DIRECTION;
    }

     moveLeft (){
        if ((this.player.col - this.step) >= 0) {
            this.player.col -= this.step;
        }
        this.player.direction = LEFT_DIRECTION;
    }

     moveRight (){
        if ((this.player.col + this.step) < this.maze.cols) {
            this.player.col += this.step;
        }
        this.player.direction = RIGHT_DIRECTION;
    }

    setStyle(){
        this.playerDiv.style.marginLeft = this.player.col * this.maze.cellSize + 'px'; // move right/left
        this.playerDiv.style.marginTop = this.player.row * this.maze.cellSize + 'px'; //move up/down
        this.playerDiv.style.transform = `rotate(${this.player.direction}deg)`; // update the direction of facing
    }
}

const player = new Player(document.querySelector('.player'));
const maze = new Maze(COLS_COUNT, ROWS_COUNT, CELL_SIZE);
const game = new Game(player, maze, STEP);


 