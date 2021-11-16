import * as PIXI from 'pixi.js';
import {Button, IconButton} from './Button';

const headerContainer = new PIXI.Container();
const setup = (app, height, backgroundColor) =>{
    headerContainer.addChild(new PIXI.Graphics().beginFill(backgroundColor, 0.6)
                                .drawRect(0, 0, app.screen.width, height)
                                .endFill());
    app.stage.addChild(headerContainer);
    const playIcon = PIXI.Sprite.from('Assets/UI/play.png');
    const playButton = new IconButton(128, 128, 0x00ff00, playIcon);
    headerContainer.addChild(playButton.container);
};

export {setup, headerContainer as container};