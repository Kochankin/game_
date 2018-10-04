'use strict';

class Player {
    constructor(playerDiv, cellSize) {
      this.col = 1;
      this.row = 1;
      this.cellSize = cellSize;
      this.playerDiv = playerDiv; // html-element which we are manipulating
      this.direction = window.utils.DIRECTIONS.RIGHT; // initially the player faces right
      this.generatePlayer();
    }
    generatePlayer(){
        // size of player is equal to the cell size
        this.playerDiv.style.width = this.cellSize + 'px'; 
        this.playerDiv.style.height = this.cellSize + 'px';
        this.playerDiv.style.left = this.col * this.cellSize + 'px'; // absolute positioning
        this.playerDiv.style.top = this.row * this.cellSize + 'px'; 
    }
  }
