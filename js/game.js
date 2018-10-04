'use strict';

class Game {
    constructor(player, maze, step){
        this.step = step;
        this.player = player;
        this.maze = maze;
        this.isWall = false; 
        this.addListener(); // init listener
        this.moveByTimer(); // init move 
    }

    addListener(){
        document.addEventListener('keydown', this.moveByKeys.bind(this)); 
    }

    getMoveHandlers(){
        const move = (stepRow, stepCol) => {
        // check the next step, if player runs into wall keep the current position 
            if (this.maze.matrix[this.player.row + stepRow][this.player.col + stepCol]){
                this.isWall = true; // there is a barrier   
            } else {
                this.player.row += stepRow;
                this.player.col += stepCol;
                document.querySelector('.walk').play(); // needs user interaction to start working 
            }   
        }
            
        return {
            UP () {
                move(-this.step, 0); // move to the row above 
                this.player.direction = window.utils.DIRECTIONS.UP;
            },
            DOWN () { // move to the row below
                move(this.step, 0);
                this.player.direction = window.utils.DIRECTIONS.DOWN;
            },
            LEFT () { // move to the previous column (cell)
                move(0, -this.step);
                this.player.direction = window.utils.DIRECTIONS.LEFT;
            },
            RIGHT () { // move to the next column (cell)
                move(0, this.step);
                this.player.direction = window.utils.DIRECTIONS.RIGHT;
            }
        }
    }

    moveByKeys(event){ 
        // only handle 'arrow' press events (key codes 37-40)
        if (window.utils.KEY_CODES[event.keyCode]){ 
            const moveHandlers = this.getMoveHandlers();
            const direction = window.utils.KEY_CODES[event.keyCode]; //get direction 'UP'/'DOWN'/..
            moveHandlers[direction].call(this); // call handler depending on direction
            this.updateView(); 
        }
    }

    moveByTimer(){
        this.makeSingleMove();
        if (this.isWall) { // check whether the player faces the wall
            this.rotateLeft(); // if there is a wall, make a rotate
        }
        this.updateView();
        // setTimeout in this case is better than setInterval, since the interval is more accurate
        setTimeout(this.moveByTimer.bind(this), 1000); 
    }

    makeSingleMove(){
        const moveHandlers = this.getMoveHandlers();
        const directionEntries = Object.entries(window.utils.DIRECTIONS);//obtain an array of [key:value] arrays
        // get name of the current direction: it's [0] element within the only filtered entry
        const direction = directionEntries.filter(entry => 
            entry[1] === this.player.direction)[0][0]; 
        moveHandlers[direction].call(this);
    }

    rotateLeft(){
        if (this.player.direction === window.utils.DIRECTIONS.LEFT){
            // adding 90, we get 360, while there are constants for 0, 90, 180, 270 only
            this.player.direction = window.utils.DIRECTIONS.UP; 
        }  else {
            this.player.direction += 90;
        }
        this.isWall = false; // the barrier was eliminated
    }

    updateView(){
        // move right/left
        this.player.playerDiv.style.left = this.player.col * this.maze.cellSize + 'px'; 
        //move up/down
        this.player.playerDiv.style.top = this.player.row * this.maze.cellSize + 'px'; 
        // update the direction of player facing
        this.player.playerDiv.style.transform = `rotate(${this.player.direction}deg)`; 
    }
}