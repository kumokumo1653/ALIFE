import * as PIXI from 'pixi.js';
import './style.scss';

const app = new PIXI.Application({
    width: $(window).innerWidth(),
    height: $(window).innerHeight(),
    backgroundColor: 0x000000,
    antialias: true,
    
    });
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
app.renderer.view.addEventListener('mousedown' ,(e) =>{
    prePos = {x: e.clientX, y: e.clientY};
    dragFlag = true;
});
app.renderer.view.addEventListener('mouseup', () =>{
    prePos = null;
    dragFlag = false;
});
app.renderer.view.addEventListener('mouseleave', () =>{
    prePos = null;
    dragFlag = false;
});
app.renderer.view.addEventListener('mousemove', (e) =>{
    if(dragFlag){
        app.stage.x += (e.clientX - prePos.x);
        app.stage.y += (e.clientY - prePos.y);
        prePos = {x: e.clientX, y: e.clientY};
    }
});
//zoom
let wheelState = 0;
let zoomStandard = 1;
const maxZoom = 3;
const minZoom = 0.2;
const zoomSensitivity = 0.1;
app.renderer.view.addEventListener('wheel', (e) =>{
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
