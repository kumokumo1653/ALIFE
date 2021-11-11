import * as PIXI from 'pixi.js';
import './style.scss';
import MousewheelPlugin from './MousewheelPlugin';
const app = new PIXI.Application({
    width: $(window).innerWidth(),
    height: $(window).innerHeight(),
    backgroundColor: 0x000000,
    antialias: true,
    
});
const mousewheelPlugin = new MousewheelPlugin(app);
app.stage.hitArea = app.screen;
app.stage.interactive = true;


const line = new PIXI.Graphics();
for(let i = 0; i < 10000;i += 50){
    line.lineStyle(2,0x999999).moveTo(i, 0).lineTo(i, 10000);
    line.lineStyle(2,0x999999).moveTo(0, i).lineTo(10000, i);
}
app.stage.addChild(line);

//pan
let prePos;
let dragFlag = false;

app.stage.mousedown = (e) =>{
    console.log('down');
    prePos = {x: e.data.global.x, y: e.data.global.y};
    dragFlag = true;
};
app.stage.mouseup = () =>{
    console.log('up');
    prePos = null;
    dragFlag = false;
};
app.stage.mouseleave = () =>{
    console.log('leave');
    prePos = null;
    dragFlag = false;
};
app.stage.on('mousemove', (e) =>{
    if(dragFlag){
        app.stage.x += (e.data.global.x - prePos.x);
        app.stage.y += (e.data.global.y - prePos.y);
        prePos = {x: e.data.global.x, y: e.data.global.y};
        app.stage.hitArea = new PIXI.Rectangle(-app.stage.x, -app.stage.y, app.screen.width, app.screen.height);
    }

});

//zoom
let wheelState = 0;
let zoomStandard = 1;
const maxZoom = 3;
const minZoom = 0.2;
const zoomSensitivity = 0.1;
app.stage.on('wheel', (e) =>{
    wheelState += e.deltaY < 0 ? 1 : -1;
    wheelState = wheelState > Math.round((maxZoom - zoomStandard) / zoomSensitivity) ? Math.round((maxZoom - zoomStandard) / zoomSensitivity) : 
                wheelState < -Math.round((zoomStandard - minZoom) / zoomSensitivity) ? -Math.round((zoomStandard - minZoom) / zoomSensitivity) : wheelState;
    if(wheelState == 0){
        app.stage.scale.x = 1;
        app.stage.scale.y = 1;
    }else{
        const rate = zoomStandard + wheelState * zoomSensitivity;
        app.stage.scale.x = rate;
        app.stage.scale.y = rate;
        console.log(rate);
    }
});


//Auto Resize 
$(window).resize(() => {
    app.renderer.resize($(window).innerWidth(), $(window).innerHeight());
});

//mount app
const el = document.getElementById('app');
el.appendChild(app.view);
