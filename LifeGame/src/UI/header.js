import * as PIXI from 'pixi.js';

const headerContainer = new PIXI.Container();
const setup = (app, height, backgroundColor) =>{
    headerContainer.addChild(new PIXI.Graphics().beginFill(backgroundColor, 0.6)
                                .drawRect(0, 0, app.screen.width, height)
                                .endFill());
    app.stage.addChild(headerContainer);
};

export {setup, headerContainer as container};