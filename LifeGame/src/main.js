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


const display = new PIXI.Graphics();
display.interactive = true;
display.hitArea = new PIXI.Rectangle(0,0,app.screen.width, app.screen.height);
app.stage.addChild(display);
const drawer = new lifegame_drawer(10, 50, lifegameContainer, lifegameTicker, display);
//transport container center
lifegameContainer.x = app.screen.width / 2 - drawer.width / 2;
lifegameContainer.y = app.screen.height / 2 - drawer.height / 2;

//drawer.setup([{x: 3,y: 3}, {x: 3,y: 4}, {x: 3, y: 5}]);
//drawer.start(1);

const line = new PIXI.Graphics();
line.lineStyle(3, 0xff0000).moveTo(0,app.screen.height / 2).lineTo(app.screen.width, app.screen.height / 2);
line.lineStyle(3, 0xff0000).moveTo(app.screen.width / 2,0).lineTo(app.screen.width / 2, app.screen.height);
app.stage.addChild(line);


//header
const header = new Header(app.screen.width, 200, 0xffffff, 0.6);
header.setup(drawer);
app.stage.addChild(header.container);






//Auto Resize 
$(window).resize(() => {
    app.renderer.resize($(window).innerWidth(), $(window).innerHeight());
});

//mount app
const el = document.getElementById('app');
el.appendChild(app.view);
