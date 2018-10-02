const playerDiv = document.querySelector('.player');

class Player {
    constructor(playerDiv) {
      this.col = 0;
      this.row = 0;
      this.playerDiv = playerDiv;
    }
  }
  
  class Maze {
    constructor(cols, rows, cellSize) {
      this.cols = cols;
      this.rows = rows;
      this.cellSize = cellSize;  
      this.generate();
    }

    generate(){
        this.mazeHeight = this.rows * this.cellSize;
        this.mazeWidth = this.cols * this.cellSize;
    }
}
  

class Game {
    constructor(player, maze){
        this.step = 1;
        this.player = player;
        this.col = player.col;
        this.row = player.row;
        this.playerDiv = player.playerDiv;
        this.maze = maze;
        this.addListener();
    }

    addListener(){
        document.addEventListener('keydown', move);
        const self = this;
        function move(event){
            if (event.keyCode === 38){
                self.moveUp();
            } else if (event.keyCode === 40){
                self.moveDown();
            } else if (event.keyCode === 37){
                self.moveLeft();
            } else if (event.keyCode === 39){
               self.moveRight();
            }
          self.playerDiv.style.marginLeft = self.row * self.maze.cellSize + 'px';
          self.playerDiv.style.marginTop= self.col * self.maze.cellSize + 'px';   
        }
    }

    moveUp (){
        if ((this.col - this.step) >= 0) {
            this.col = this.col - this.step;
        }
        this.player.col = this.col;
    }

     moveDown (){
        if ((this.col + this.step) < this.maze.rows) {
            this.col = this.col + this.step;
        }
        this.player.col = this.col;
    }

     moveLeft (){
        if ((this.row - this.step) >= 0) {
            this.row = this.row - this.step;
        }
        this.player.row = this.row;
    }

     moveRight (){
        if ((this.row + this.step) < this.maze.rows) {
            this.row = this.row + this.step;
        }
        this.player.row = this.row;
    }
}




const player = new Player(playerDiv);
const maze = new Maze(7, 7, 100);
const game = new Game(player, maze);


 