class LifeGame{
    #field = [[]];
    #individuals = [];
    constructor(size){
        this.size = size;
    }
    
    setup(initIndividuals){
        this.#field = Array.from(new Array(this.size), _ => new Array(this.size).fill(false));
        this.#individuals = [...initIndividuals];
        initIndividuals.forEach((el) =>{
            this.#field[el.y][el.x] = true;
        });
    }

    reset(){
        this.#field = [[]];
        this.#individuals = [];
        
    }

    get individuals(){
        return this.#individuals;
    }
    
    run(){
        const deceaseds = [];
        const births = []; 
        for(let e = 0; e < this.#individuals.length; e++){
            let neighbor = 0;
            
            //check die
            for(let i = -1; i <= 1; i++){
                for(let j = -1; j <= 1; j++){
                    
                    if(i == 0 && j == 0) continue;
                    if(this.#individuals[e].y + i < 0 || this.#individuals[e].y + i >= this.size) continue;
                    if(this.#individuals[e].x + j < 0 || this.#individuals[e].x + j >= this.size) continue;
                    if(this.#field[this.#individuals[e].y + i][this.#individuals[e].x + j]) neighbor++;
                    else{
                        //check birth
                        const adjacent = {x: this.#individuals[e].x + j, y: this.#individuals[e].y + i};
                        let liver = 0; 
                        for(let u = -1; u <= 1; u++){
                            for(let v = -1; v <= 1; v++){
                                if(adjacent.y + u < 0 || adjacent.y + u >= this.size) continue;
                                if(adjacent.x + v < 0 || adjacent.x + v >= this.size) continue;
                                if(this.#field[adjacent.y + u][adjacent.x + v])liver++; 
                            }
                        }
                        if(liver == 3){
                            births.push({x:adjacent.x, y: adjacent.y});
                        }
                    }
                }
            }
            if(neighbor >= 4){
                //overcrowd
                deceaseds.push({x: this.#individuals[e].x, y: this.#individuals[e].y, index: e});
            }else if (neighbor <= 1){
                //depopular
                deceaseds.push({x: this.#individuals[e].x, y: this.#individuals[e].y, index: e});
            }
        }
        let deletecnt = 0;
        for(let i = 0; i < deceaseds.length;i++){
            this.#field[deceaseds[i].y][deceaseds[i].x] = false;
            this.#individuals.splice(deceaseds[i].index - deletecnt, 1);
            deletecnt++;
        }
        births.forEach(element =>{
            if(!this.#field[element.y][element.x]){
                this.#individuals.push({x: element.x, y: element.y});
                this.#field[element.y][element.x] = true;
            }
        });
    }
}

export default LifeGame;