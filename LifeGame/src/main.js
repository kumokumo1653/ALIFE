import * as PIXI from 'pixi.js';
import './style.scss';
import {activateMouseWheel} from './MousewheelPlugin';
import lifegame_drawer from './LifeGame/Drawer';
import { Header } from './UI/header';

const app = new PIXI.Application({
    width: $(window).innerWidth(),
    height: $(window).innerHeight(),
    backgroundColor: 0x000000,
    antialias: true,
    
});
activateMouseWheel(app);
app.stage.hitArea = app.screen;
app.stage.interactive = true;

const lifegameContainer = new PIXI.Container();
const lifegameTicker = new PIXI.Ticker();
app.stage.addChild(lifegameContainer);


const drawer = new lifegame_drawer(10, 50, lifegameContainer, lifegameTicker);
//transport container center
lifegameContainer.x = app.screen.width / 2 - drawer.width / 2;
lifegameContainer.y = app.screen.height / 2 - drawer.height / 2;

drawer.setup([{x: 3,y: 3}, {x: 3,y: 4}, {x: 3, y: 5}]);
drawer.start(1);

const display = new PIXI.Graphics();
display.interactive = true;
display.hitArea = new PIXI.Rectangle(0,0,screen.width, screen.height);
app.stage.addChild(display);

//header
const header = new Header(app.screen.width, 200, 0xffffff, 0.6);
header.setup(drawer);
app.stage.addChild(header.container);

const line = new PIXI.Graphics();
line.lineStyle(2, 0xff0000).moveTo(0, app.screen.height / lifegameContainer.scale.y / 2).lineTo(app.screen.width, app.screen.height / lifegameContainer.scale.y / 2);
line.lineStyle(2, 0xff0000).moveTo(app.screen.width / lifegameContainer.scale.x / 2, 0).lineTo(app.screen.width / lifegameContainer.scale.x / 2, app.screen.height);
app.stage.addChild(line);
//drag
let prePos;
let dragFlag = false;

display.on('mousedown', (e) =>{
    prePos = {x: e.data.global.x, y: e.data.global.y};
    dragFlag = true;
});
display.on('mouseup', () =>{
    prePos = null;
    dragFlag = false;
});
display.on('mouseout', () =>{
    prePos = null;
    dragFlag = false;
});
display.on('mousemove', (e) =>{
    if(dragFlag){
        const currentPos = {x: lifegameContainer.x, y: lifegameContainer.y};
        lifegameContainer.x += (e.data.global.x - prePos.x);
        lifegameContainer.y += (e.data.global.y - prePos.y);
        if(lifegameContainer.x  > app.screen.width  / 2 || lifegameContainer.y  > app.screen.height  / 2 ||
            lifegameContainer.x + drawer.width * lifegameContainer.scale.x  < app.screen.width /  2 || lifegameContainer.y + drawer.height * lifegameContainer.scale.y < app.screen.height /  2                                                                                             
        ){
            lifegameContainer.x = currentPos.x;
            lifegameContainer.y = currentPos.y;
            
        }
        prePos = {x: e.data.global.x, y: e.data.global.y};
    }

});

//zoom
let wheelState = 0;
let zoomStandard = 1;
const maxZoom = 3;
const minZoom = 0.2;
const zoomSensitivity = 0.1;
display.on('wheel', (e) =>{
    const currentPos = {x: lifegameContainer.x, y: lifegameContainer.y};
    wheelState += e.deltaY < 0 ? 1 : -1;
    wheelState = wheelState > Math.round((maxZoom - zoomStandard) / zoomSensitivity) ? Math.round((maxZoom - zoomStandard) / zoomSensitivity) : 
                wheelState < -Math.round((zoomStandard - minZoom) / zoomSensitivity) ? -Math.round((zoomStandard - minZoom) / zoomSensitivity) : wheelState;

    const mousePosOnContainer = {   x: (e.clientX - lifegameContainer.x) / lifegameContainer.scale.x,
                                    y: (e.clientY - lifegameContainer.y) / lifegameContainer.scale.y
                                };
    
    if(wheelState == 0){
        lifegameContainer.scale.x = 1;
        lifegameContainer.scale.y = 1;
    }else{
        const rate = zoomStandard + wheelState * zoomSensitivity;
        lifegameContainer.scale.x = rate;
        lifegameContainer.scale.y = rate;
    }
    const newMousePosOnScreen = {   x: mousePosOnContainer.x * lifegameContainer.scale.x + lifegameContainer.x, 
                                    y: mousePosOnContainer.y * lifegameContainer.scale.y + lifegameContainer.y
                                };
    lifegameContainer.x -= newMousePosOnScreen.x - e.clientX;
    lifegameContainer.y -= newMousePosOnScreen.y - e.clientY;

    if(lifegameContainer.x  > app.screen.width  / 2 || lifegameContainer.y  > app.screen.height  / 2 ||
        lifegameContainer.x + drawer.width * lifegameContainer.scale.x  < app.screen.width /  2 || lifegameContainer.y + drawer.height * lifegameContainer.scale.y < app.screen.height /  2                                                                                             
    ){
        lifegameContainer.x = currentPos.x;
        lifegameContainer.y = currentPos.y;
            
    }
});


//Auto Resize 
$(window).resize(() => {
    app.renderer.resize($(window).innerWidth(), $(window).innerHeight());
});

//mount app
const el = document.getElementById('app');
el.appendChild(app.view);
