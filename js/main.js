
class GameInitializer {
    constructor(step, player, matrix, cellSize, wrapper, canvas) {
        this.step = step;
        this.maze = new Maze(matrix, cellSize, wrapper, canvas)
        this.player = new Player(player, cellSize);
        this.init();
    }

    init(){
        return new Game(this.player, this.maze, this.step);
    }
}

// init Game
new GameInitializer(
    window.utils.STEP, 
    window.utils.PLAYER,
    window.utils.MATRIX,
    window.utils.CELL_SIZE, 
    window.utils.WRAPPER, 
    window.utils.MAZE_CANVAS,
    window.utils.CELL_SIZE
);

