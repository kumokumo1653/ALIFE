import LifeGame from "./LifeGame";
import * as PIXI from 'pixi.js';
class Drawer{
    #controller;
    lineColor = 0x999999;
    boxColor = 0x00ff00;
    lineWeight = 2;
    fps;
    #elapsedsecond = 0;
    constructor(size, bsize, container, ticker){
        this.size = size;
        this.#controller = new LifeGame(this.size);
        this.container = container;
        this.ticker = ticker;
        this.bsize = bsize;
        this.width = this.size * this.bsize;
        this.height = this.size * this.bsize;
    }

    setup(initIndividuals){
        this.#controller.setup(initIndividuals);
        this.ticker.add(() =>{
            this.#elapsedsecond += (this.ticker.elapsedMS / 1000);
            if(1 / this.fps < this.#elapsedsecond){
                this.#elapsedsecond = 0;
                this.#controller.run();
                this.drawField();
            }
        });
    }

    start(fps = 1){
        this.fps = fps;
        this.ticker.start();
    }

    update(){
        this.ticker.update();
    }

    drawField(){
        this.container.removeChildren();
        const line = new PIXI.Graphics();
        for(let i = 0; i <= this.size; i++){
            line.lineStyle(this.lineWeight, this.lineColor).moveTo(i * this.bsize, 0).lineTo(i * this.bsize, this.size * this.bsize);
            line.lineStyle(this.lineWeight, this.lineColor).moveTo(0, i * this.bsize).lineTo(this.size * this.bsize, i * this.bsize);
        }
        this.container.addChild(line);
        
        this.#controller.individuals.forEach(el =>{
            const rect = new PIXI.Graphics().beginFill(this.boxColor)
                                .drawRect(el.x * this.bsize + this.lineWeight / 2 , el.y * this.bsize + this.lineWeight / 2 , this.bsize - this.lineWeight , this.bsize - this.lineWeight                                                                                                                                                                               )
                                .endFill();
            this.container.addChild(rect);
        });
        
    }
}

export default Drawer;