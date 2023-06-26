class Automata {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        // Fill the 2d array with random number 0 or 1
        this.arr = new Array(rows).fill(0).map(() => new Array(cols).fill(0).map(() => Math.floor(Math.random() * 2)));
        // Each cell size is 5
        this.cellSize = 5;

        this.ticks = 0;
        // this.speed controls the frequency of the update, the bigger the value is, the frequency of the update is smaller (slower)
        this.speed = 300;
        this.ticksElement = document.getElementById('ticks');  // displaying ticks
        this.speedElement = document.getElementById('speed');  // HTML element for controlling speed

        // Update the speed when the slider changes
        this.speedElement.addEventListener('input', () => {
            this.speed = this.speedElement.value;
        });

        // Record the time when the Automata created
        this.lastUpdateTime = Date.now();
    }

    update() {
        // Calculate the time since the last update
        let timeDifference = Date.now() - this.lastUpdateTime;

        // If timeDifference is greater than speed (meaning the time from last update has to be bigger than the speed)
        // So the screen will start next update
        if (timeDifference > this.speed) {
            // New array for the updated state initializes filled with 0
            let nextArr = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0));

            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    // Get the 8 alive neighbor cell numbers of a specific coordinate on the canvas
                    let neighbors = this.getNeighborCount(i, j);

                    // Apply Game of life rules
                    if (this.arr[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                        nextArr[i][j] = 0;
                    } else if (this.arr[i][j] === 1 && (neighbors === 2 || neighbors === 3)) {
                        nextArr[i][j] = 1;
                    } else if (this.arr[i][j] === 0 && neighbors === 3) {
                        nextArr[i][j] = 1;
                    } else {
                        nextArr[i][j] = this.arr[i][j];
                    }
                }
            }
            // Update the array to the new state
            this.arr = nextArr;
            // Increment ticks and update display
            this.ticks++;
            this.ticksElement.textContent = 'Ticks: ' + this.ticks;

            // Reset the last update time
            this.lastUpdateTime = Date.now();
        }
    }


    getNeighborCount(x, y) {
        let count = 0;
        // offset position coordinates of all surrounding cells
        for(let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) { //（x,y) itself, ignore
                    continue;
                }
                // Go through each neighbor coordinate by adding up the offset position
                // newX can be : x-1, x, x+1
                let newX = x + i;
                // newY can be : y-1, y, y+1
                let newY = y + j;
                // Make sure each newX and newY in valid range and on that grid has alive cell then count++
                if (newX >= 0 && newY >= 0 && newX < this.rows && newY < this.cols && this.arr[newX][newY] === 1) {
                    count++;
                }
            }
        }
        return count;
    }

    draw(ctx) {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(this.arr[i][j] === 1) { // If the current element (cell) is 1 (alive),draw the cell black
                    ctx.fillStyle = 'black';
                    // Fill in a rectangle at of the cell's coordinates.
                    ctx.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize-1, this.cellSize-1)
                }
            }
        }
    };
}
