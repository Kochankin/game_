'use strict';

(function () {

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
    
    const MATRIX = [
        [0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 0], 
    ]
    
    const STEP = 1;
    const WRAPPER = document.querySelector('.wrapper');
    const PLAYER = document.querySelector('.player');
    const MAZE_CANVAS = document.querySelector('.maze');

  window.utils = {
    DIRECTIONS,
    KEY_CODES,
    CELL_SIZE,
    MATRIX,
    STEP,
    WRAPPER,
    MAZE_CANVAS,
    PLAYER
  }

})();


