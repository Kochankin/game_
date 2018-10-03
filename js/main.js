const DIRECTIONS = {
    UP: 0,
    RIGHT: 90,
    DOWN: 180,
    LEFT: 270
}
const [UP_KEY, RIGHT_KEY, DOWN_KEY, LEFT_KEY] = [38, 39, 40, 37];
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
        this.animationIsActive = false;
        this.isWall = false;
        this.addListeners(); // init listeners
    }

    addListeners(){
        document.addEventListener('keydown', this.move.bind(this));  
        this.button.addEventListener('click', this.animateMove.bind(this));
    }

     move(event){
        switch (event.keyCode) {
            case UP_KEY:
                this.moveUp();
                break;
            case DOWN_KEY:
                this.moveDown();
                break;
            case LEFT_KEY:
                 this.moveLeft();
                break;
            case RIGHT_KEY:
                this.moveRight();
        }

        this.updateView(); // update the view
    }

    moveUp (){
       if ((this.player.row - this.step) >= 0) {
            this.player.row -= this.step;
        } else { this.isWall = true;}
        this.player.direction = DIRECTIONS.UP;
    }

     moveDown (){
        if ((this.player.row + this.step) < this.maze.rows) {
            this.player.row += this.step;
        }else { this.isWall = true;}
        this.player.direction = DIRECTIONS.DOWN;
    }

     moveLeft (){
        if ((this.player.col - this.step) >= 0) {
            this.player.col -= this.step;
        }else { this.isWall = true;}
        this.player.direction = DIRECTIONS.LEFT;
    }

     moveRight (){
        if ((this.player.col + this.step) < this.maze.cols) {
            this.player.col += this.step;
       } else { this.isWall = true;}
        this.player.direction = DIRECTIONS.RIGHT;
    }

    animate(){
        if (this.animationIsActive) { // if amimation is in progress make move
            switch (this.player.direction) { // make move
                case DIRECTIONS.UP:
                    this.moveUp();
                    break;
                case DIRECTIONS.DOWN:
                    this.moveDown();
                    break;
                case DIRECTIONS.LEFT:
                    this.moveLeft();
                    break;
                case DIRECTIONS.RIGHT:
                    this.moveRight();
                    break;
            }
            
            if (this.isWall) { // check whether the player faces the wall
                if (this.player.direction === DIRECTIONS.LEFT){
                    this.player.direction = DIRECTIONS.UP;
                }  else {
                    this.player.direction += 90;
                }
        
                this.isWall = false;
            }

            this.updateView();
        
            setTimeout(this.animate.bind(this), 1000);
        } else { // if animation was stopped clear interval and stop moving
            clearTimeout(this.animate.bind(this));
        }
    }

    animateMove(event){
        const [START_BTN_TEXT, STOP_BTN_TEXT] = ['Let him go!', 'Stop him!'];
        this.animationIsActive = !this.animationIsActive;
        if (this.animationIsActive) {
            event.target.textContent = STOP_BTN_TEXT;
            this.animate();
        } else {
            event.target.textContent = START_BTN_TEXT;
        }
        
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

 