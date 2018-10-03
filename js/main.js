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

const [COLS_COUNT, ROWS_COUNT, CELL_SIZE] = [7, 7, 100];
const STEP = 1;
const BUTTON = document.querySelector('button');

class Player {
    constructor(playerDiv) {
      this.col = 0;
      this.row = 0;
      this.playerDiv = playerDiv; // html-element which we are manipulating
      this.direction = DIRECTIONS.RIGHT; // initially the player faces right
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
    constructor(player, maze, step, button){
        this.step = step;
        this.player = player;
        this.playerDiv = player.playerDiv;
        this.maze = maze;
        this.button = button;
        this.animationIsActive = true;
        this.isWall = false;
        this.addListener(); // init listeners
        this.animateMove();
    }

    addListener(){
        document.addEventListener('keydown', this.moveByKeys.bind(this));  
        this.button.addEventListener('click', this.animateMove.bind(this));
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
        moveHandlers[direction].call(this); // define handler depending on direction
        this.updateView(); 
    }

    moveByTimer(){
        if (this.animationIsActive) { // if animation is in progress, make move
            this.makeSingleMove();
            if (this.isWall) { // check whether the player faces the wall
                this.rotateLeft();
            }
            this.updateView();
            setTimeout(this.moveByTimer.bind(this), 1000);
        } 
    }

    makeSingleMove(){
        const moveHandlers = this.getMoveHandlers();
        const directionEntries = Object.entries(DIRECTIONS);
        // get name of the current direction: it's [0] element within the only filtered entry
        const direction = directionEntries.filter(entry => 
            entry[1] === this.player.direction)[0][0];
        moveHandlers[direction].call(this);
    }

    animateMove(event){
        const [START_BTN_TEXT, STOP_BTN_TEXT] = ['Go by timer', 'Stop'];
        if (event) { // if the method was initialized by click, change the animation status
          this.animationIsActive = !this.animationIsActive;  
        }

        if (this.animationIsActive) {
            this.button.textContent = STOP_BTN_TEXT;
            this.moveByTimer();
        } else {
            this.button.textContent = START_BTN_TEXT;
            clearTimeout(this.moveByTimer); // if animation was stopped clear interval and stop moving
        }       
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
        this.playerDiv.style.marginLeft = this.player.col * this.maze.cellSize + 'px'; // move right/left
        this.playerDiv.style.marginTop = this.player.row * this.maze.cellSize + 'px'; //move up/down
        this.playerDiv.style.transform = `rotate(${this.player.direction}deg)`; // update the direction of facing
    }
}

const player = new Player(document.querySelector('.player'));
const maze = new Maze(COLS_COUNT, ROWS_COUNT, CELL_SIZE);
const game = new Game(player, maze, STEP, BUTTON);

 