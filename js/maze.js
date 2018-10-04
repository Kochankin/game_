'use strict';

class Maze {
    constructor(matrix, cellSize, wrapper, mazeCanvas) {
        this.matrix = this.addBorderWallsToMatrix(matrix);
        this.rows = matrix.length;
        this.cols = matrix[0].length;
        this.cellSize = cellSize; 
        this.wrapper = wrapper;
        this.mazeCanvas = mazeCanvas;
        this.generateCanvas();
    } 

    generateCanvas(){
        const ctx = this.mazeCanvas.getContext('2d');
        this.setDeskSize();
        this.drawGrid(ctx);
        this.drawMaze(ctx);
    }

    setDeskSize(){
        const height = this.rows * this.cellSize;
        const width = this.cols * this.cellSize;
        this.wrapper.style.width = width + 'px';
        this.wrapper.style.height = height + 'px';
        this.mazeCanvas.width = width;
        this.mazeCanvas.height = height;
    }

    addBorderWallsToMatrix(matrix){ // add walls to the initial maze matrix
        for (let i = 0; i < matrix.length; i++){
            matrix[i].unshift(1);
            matrix[i].push(1);   
        }
        let wall = new Array(matrix[0].length).fill(1);
        matrix.unshift(wall);   
        matrix.push(wall);
        return matrix;
    }

    drawGrid(ctx){
        ctx.strokeRect(0, 0, this.width, this.height); // draw maze border
        for (let i = this.cellSize; i < this.width; i+=this.cellSize){ // draw vertical lines
            ctx.fillRect(i, 0, 1, this.width);
        }  
        for (let j = this.cellSize; j < this.height; j +=this.cellSize){ // draw horizontal lines
            ctx.fillRect(0, j, this.height, 1);
        } 
    }

    drawMaze(ctx){
        this.matrix.forEach((row, rowI) => {
            row.forEach((cell, cellI) => {
                if (cell) { // if cell === 1 there is a wall to draw
                    const x = cellI * this.cellSize; 
                    const y = rowI * this.cellSize;
                    ctx.fillRect(x, y, this.cellSize, this.cellSize);
                }
            });
        });
    }
}