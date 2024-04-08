class Automata {
    constructor(game){
        Object.assign(this, {game})
        
		this.automataArray = [];
		this.rows = 100; // Number of rows
        this.cols = 100; // Number of columns
		
        this.birthRules = [3];
        this.sustainRules = [2, 3];
		
		this.tickCount = 0;
		this.ticks = 0;

        this.speed = parseInt(document.getElementById("speed").value, 10);
        
        for (let col = 0; col < this.cols; col++) {
            this.automataArray.push([]);
            for (let row = 0; row < this.rows; row++) {
                this.automataArray[col][row] = 0;
            }
        }
        this.loadRandomAutomata();
        
    }

    loadRandomAutomata() {
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                this.automataArray[col][row] = randomInt(2);
            }
        }
    }
        
    count(col, row) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((i || j) && this.automataArray[col + i] && this.automataArray[col + i][row + j]) count++;
            }
        }
        return count;
    }

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);

        if (this.tickCount++ >= this.speed && this.speed != 120) {
            this.birthRules = [];
            this.sustainRules = [];
            for (let i = 1; i < 9; i++){
                if (document.getElementById('live' + i).checked){
                    this.birthRules.push(i);
                }
                if (document.getElementById('sustain' + i).checked){
                    this.sustainRules.push(i);
                }
            }

            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            let newAutomataArray = [];
            for (let col = 0; col < this.cols; col++) {
                newAutomataArray.push([]);
                for (let row = 0; row < this.rows; row++) {
                    newAutomataArray[col].push(0);
                }
            }

            for (let col = 0; col < this.cols; col++) {
                for (let row = 0; row < this.rows; row++) {
                    if (this.automataArray[col][row] && (this.sustainRules.indexOf(this.count(col, row)) > -1)) newAutomataArray[col][row] = 1;
                    if (!this.automataArray[col][row] && (this.birthRules.indexOf(this.count(col, row)) > -1)) newAutomataArray[col][row] = 1;
                }
            }
            this.automataArray = newAutomataArray;
        }
    }

    draw(ctx){
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "Black";
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                let cell = this.automataArray[col][row];
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    }
}