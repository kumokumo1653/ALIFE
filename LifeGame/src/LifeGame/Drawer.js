import LifeGame from "./LifeGame";
import * as PIXI from 'pixi.js';
class Drawer{
    #controller;
    lineColor = 0x999999;
    boxColor = 0x00ff00;
    lineWeight = 2;
    fps;
    #elapsedsecond = 0;
    isStarted = false;
    isEdit = false;
    editMode = "write";
    #initIndividuals = [];
    //drag
    prePos;
    dragFlag = false;

    //zoom
    wheelState = 0;
    zoomStandard = 1;
    maxZoom = 3;
    minZoom = 0.2;
    zoomSensitivity = 0.1;

    constructor(size, bsize, container, ticker, display){
        this.size = size;
        this.#controller = new LifeGame(this.size);
        this.container = container;
        this.display = display;
        this.ticker = ticker;
        this.bsize = bsize;
        this.width = this.size * this.bsize;
        this.height = this.size * this.bsize;

        const line = new PIXI.Graphics();
        for(let i = 0; i <= this.size; i++){
            line.lineStyle(this.lineWeight, this.lineColor).moveTo(i * this.bsize, 0).lineTo(i * this.bsize, this.size * this.bsize);
            line.lineStyle(this.lineWeight, this.lineColor).moveTo(0, i * this.bsize).lineTo(this.size * this.bsize, i * this.bsize);
        }
        this.container.addChild(line);

        this.display.on('mousedown', (e)=>down(e));
        this.display.on('mouseup', ()=>up());
        this.display.on('mouseout', ()=>out());
        this.display.on('mousemove', (e)=>{move(e)});
        this.display.on('wheel', (e) => wheel(e));

        /*-------- callback function ----------*/
        const down = ((e) => {
            this.dragFlag = true;
            this.prePos = {x: e.data.global.x, y: e.data.global.y};
            if(this.isEdit){
                const cellPos = {x: Math.floor((e.data.global.x - this.container.x) / this.container.scale.x / this.bsize), y: Math.floor((e.data.global.y - this.container.y) / this.container.scale.y / this.bsize)};
                this.#updateInitIndividuals(cellPos,this.editMode);
            }
        }).bind(this);

        const up = (() => {
            this.dragFlag = false;
            this.prePos = null;
        }).bind(this);

        const out = (()=>{
            this.dragFlag = false;
            this.prePos = null;
        }).bind(this);

        const move = ((e) => {
            if(this.dragFlag){
                if(this.isEdit){
                    //edit
                    const preCellPos = {x: Math.floor((this.prePos.x - this.container.x) / this.container.scale.x / this.bsize), y: Math.floor((this.prePos.y - this.container.y) / this.container.scale.y / this.bsize)};
                    const cellPos = {x: Math.floor((e.data.global.x - this.container.x) / this.container.scale.x / this.bsize), y: Math.floor((e.data.global.y - this.container.y) / this.container.scale.y / this.bsize)};
                    if(preCellPos.x != cellPos.x || preCellPos.y != cellPos.y){
                        this.#updateInitIndividuals(cellPos,this.editMode);
                    }
                }else{
                    //move container
                    const currentPos = {x: this.container.x, y: this.container.y};
                    this.container.x += (e.data.global.x - this.prePos.x);
                    this.container.y += (e.data.global.y - this.prePos.y);
                    if(this.container.x  > this.display.hitArea.width  / 2 || this.container.y  > this.display.hitArea.height  / 2 ||
                        this.container.x + this.width * this.container.scale.x  < this.display.hitArea.width /  2 || this.container.y + this.height * this.container.scale.y < this.display.hitArea.height /  2                                                                                             
                    ){
                        this.container.x = currentPos.x;
                        this.container.y = currentPos.y;
                    }
                }
                this.prePos = {x: e.data.global.x, y: e.data.global.y};
            }
        }).bind(this);

        const wheel = ((e) =>{
            const currentPos = {x: this.container.x, y: this.container.y};
            this.wheelState += e.deltaY < 0 ? 1 : -1;
            this.wheelState = this.wheelState > Math.round((this.maxZoom - this.zoomStandard) / this.zoomSensitivity) ? Math.round((this.maxZoom - this.zoomStandard) / this.zoomSensitivity) : 
                        this.wheelState < -Math.round((this.zoomStandard - this.minZoom) / this.zoomSensitivity) ? -Math.round((this.zoomStandard - this.minZoom) / this.zoomSensitivity) : this.wheelState;

            const mousePosOnContainer = {   x: (e.clientX - this.container.x) / this.container.scale.x,
                                            y: (e.clientY - this.container.y) / this.container.scale.y
                                        };
            
            if(this.wheelState == 0){
                this.container.scale.x = 1;
                this.container.scale.y = 1;
            }else{
                const rate = this.zoomStandard + this.wheelState * this.zoomSensitivity;
                this.container.scale.x = rate;
                this.container.scale.y = rate;
            }
            const newMousePosOnScreen = {   x: mousePosOnContainer.x * this.container.scale.x + this.container.x, 
                                            y: mousePosOnContainer.y * this.container.scale.y + this.container.y
                                        };
            this.container.x -= newMousePosOnScreen.x - e.clientX;
            this.container.y -= newMousePosOnScreen.y - e.clientY;

            if(this.container.x  > this.display.hitArea.width  / 2){
                this.container.x = currentPos.x;
            }else if(this.container.x + this.width * this.container.scale.x  < this.display.hitArea.width /  2){
                    this.container.x = this.display.hitArea.width / 2 - this.width * this.container.scale.x;
            }
            
            if(this.container.y  > this.display.hitArea.height  / 2){
                this.container.y = currentPos.y;
            }else if(this.container.y + this.height * this.container.scale.y < this.display.hitArea.height /  2){
                this.container.y = this.display.hitArea.height / 2 - this.height * this.container.scale.y;
            }
        }).bind(this);
    }

    #updateInitIndividuals(cellPos,mode){
        //check field in pos
        if(cellPos.x >= 0 && cellPos.x < this.size && cellPos.y >= 0 && cellPos.y < this.size){
            const index = this.#initIndividuals.findIndex((el) => el.x == cellPos.x && el.y == cellPos.y);
            if( index === -1 && mode == "write"){
                this.#initIndividuals.push(cellPos);
            }else if(mode == "erase"){
                this.#initIndividuals.splice(index, 1);
            }                        
            this.drawField();
        } 
    }

    setup(...args){
        if(args.length == 0){
            if(this.#initIndividuals.length == 0) return;
            this.#controller.setup(this.#initIndividuals);
        } else if(args.length == 1){
            this.#controller.setup(args[0]);
        }
        this.tickerHandler = 
            () =>{
            this.#elapsedsecond += (this.ticker.elapsedMS / 1000);
            if(1 / this.fps < this.#elapsedsecond){
                this.#elapsedsecond = 0;
                this.#controller.run();
                this.drawField();
            }
        };
        this.ticker.add(this.tickerHandler);
        this.isStarted = true;
    }

    reset(){
        this.#controller.reset();
        this.isStarted = false;
        this.#initIndividuals = [];
        this.ticker.remove(this.tickerHandler);
        this.drawField();
    }

    start(fps = 1){
        this.fps = fps;
        this.ticker.start();
    }

    stop(){
        this.ticker.stop();
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
        if(this.isStarted){
            this.#controller.individuals.forEach(el =>{
                const rect = new PIXI.Graphics().beginFill(this.boxColor)
                                    .drawRect(el.x * this.bsize + this.lineWeight / 2 , el.y * this.bsize + this.lineWeight / 2 , this.bsize - this.lineWeight , this.bsize - this.lineWeight                                                                                                                                                                               )
                                    .endFill();
                this.container.addChild(rect);
            });
        }else{
            this.#initIndividuals.forEach(el =>{
                const rect = new PIXI.Graphics().beginFill(this.boxColor)
                                    .drawRect(el.x * this.bsize + this.lineWeight / 2 , el.y * this.bsize + this.lineWeight / 2 , this.bsize - this.lineWeight , this.bsize - this.lineWeight                                                                                                                                                                               )
                                    .endFill();
                this.container.addChild(rect);
            });
        }
        
    }
}

export default Drawer;