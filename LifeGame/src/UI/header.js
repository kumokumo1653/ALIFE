import * as PIXI from 'pixi.js';
import {IconButton} from './Button';

class Header{
    constructor(width, height, color, alpha){
        this.width = width;
        this.height = height;
        this.color = color;
        this.alpha = alpha;
        this._container = new PIXI.Container();
        this.frame = new PIXI.Graphics().beginFill(this.color, this.alpha)
        .drawRect(0, 0, this.width, this.height)
        .endFill();

        this._container.addChild(this.frame);
    }

    setup(drawer){
        this.drawer = drawer;

        //playButton
        const texture = PIXI.Texture.from('Assets/UI/play.png');
        const sprite = new PIXI.Sprite(texture);
        this.playButton = new IconButton(100, 100, 0xff0000, sprite);
        this._container.addChild(this.playButton.container);
        this.playButton.down(()=>{
            drawer.start(1);
        });

        //stopButton
        this.stopButton = new IconButton(100, 100, 0xff0000, PIXI.Sprite.from('Assets/UI/stop.png'));
        this.stopButton.x = 100;
        this._container.addChild(this.stopButton.container);
        this.stopButton.down(()=>{
            drawer.stop();
        });

        //edhitButton
        this.editButton = new IconButton(100, 100, 0xff0000, PIXI.Sprite.from('Assets/UI/edit.png'));
        this.editButton.x = 500;
        this._container.addChild(this.editButton.container);
        this.editButton.down(()=>{
            this.drawer.isEdit = !this.drawer.isEdit;
            this.editButton.color = this.drawer.isEdit ? 0x00ff00 : 0xff0000;
        });
    }

    
    get container(){
        return this._container;
    }
}

export {Header};