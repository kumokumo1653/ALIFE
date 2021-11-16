import * as PIXI from 'pixi.js';

//base-button
class Button{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this._container = new PIXI.Container();
        this._graphics = new PIXI.Graphics();
        this.container.addChild(this.graphics);
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
        this.color = color;
        this.alpha = alpha;
        this._graphics.beginFill(this.color, this.alpha).drawRect(this.x, this.y, this.width, this.height).endFill();
        this._graphics.mask = mask;
    }
}   


export {Button, IconButton};