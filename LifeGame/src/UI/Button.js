import * as PIXI from 'pixi.js';

//base-button
class Button{
    constructor(width, height){
        this._width = width;
        this._height = height;
        this._x = 0;
        this._y = 0;
        this._container = new PIXI.Container();
        this._container.interactive = true;
        this._graphics = new PIXI.Graphics();
        this._container.addChild(this._graphics);
    }

    down(func){
        this._container.on('mousedown',func);
    }

    set width(val){
        this._width = val;
        this._container.width = val;
    }
    get width(){
        return this._width;
    }

    set height(val){
        this._height = val;
        this._container.height = val;
    }
    get height(){
        return this._height;
    }

    set x(val){
        this._x = val;
        this._container.x = val;
    }
    get x(){
        return this._x;
    }

    set y(val){
        this._y = val;
        this._container.y = val;
    }
    get y(){
        return this._y;
    }
    get container(){
        return this._container;
    }

    get graphics(){
        return this._graphics;
    }
}

class IconButton extends Button{
    constructor(width, height, color, mask, alpha = 1){
        super(width, height);
        this.mask = mask;
        this.mask.width = width;
        this.mask.height = height;
        this.color = color;
        this.alpha = alpha;
        this._graphics.beginFill(this.color, this.alpha).drawRect(this.x, this.y, this.width, this.height).endFill();
        this._graphics.mask = this.mask;
        this._container.addChild(this.mask);
    }
}   


export {Button, IconButton};