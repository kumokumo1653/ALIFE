import * as PIXI from 'pixi.js';
import {activateMouseWheel} from '../MousewheelPlugin';
import lifegame_drawer from '../LifeGame/Drawer';
import React, {useEffect, useRef} from 'react';


function Content_PIXI(props){

    console.log("render");

    const drawer = useRef();
    const app = useRef();
    const display = useRef();
    const lifegameContainer = useRef();
    useEffect(() =>{
        console.dir(props.canvasSize);
        app.current = new PIXI.Application({
            width: props.canvasSize.width,
            height: props.canvasSize.height,
            backgroundColor: 0x000000,
            antialias: true,
            
        });
        activateMouseWheel(app.current);
        app.current.stage.hitArea = app.screen;
        app.current.stage.interactive = true;

        lifegameContainer.current = new PIXI.Container();
        const lifegameTicker = new PIXI.Ticker();
        app.current.stage.addChild(lifegameContainer.current);


        display.current = new PIXI.Graphics();
        display.current.interactive = true;
        display.current.hitArea = new PIXI.Rectangle(0,0,app.current.screen.width, app.current.screen.height);
        app.current.stage.addChild(display.current);
        drawer.current = new lifegame_drawer(10, 50, lifegameContainer.current, lifegameTicker, display.current);
        //drawer.current.setup([{x:1, y:1},{x:1, y:2}, {x:1, y:3}]);
        //drawer.current.drawField();
        //transport container center
        lifegameContainer.current.x = app.current.screen.width / 2 - drawer.current.width / 2;
        lifegameContainer.current.y = app.current.screen.height / 2 - drawer.current.height / 2;


        //const line = new PIXI.Graphics();
        //line.lineStyle(3, 0xff0000).moveTo(0,app.screen.height / 2).lineTo(app.screen.width, app.screen.height / 2);
        //line.lineStyle(3, 0xff0000).moveTo(app.screen.width / 2,0).lineTo(app.screen.width / 2, app.screen.height);
        //app.stage.addChild(line);


        //Auto Resize 
        
        //mout app
        const el = document.getElementById('pixi-content');
        el.appendChild(app.current.view);
        props.setInitialize(true);
    },[]);

    useEffect(()=>{
        console.log("resize");
        if(app.current != undefined){
            app.current.renderer.resize(props.canvasSize.width, props.canvasSize.height);
            display.current.hitArea = new PIXI.Rectangle(0,0, props.canvasSize.width, props.canvasSize.height);
            lifegameContainer.current.x = app.current.screen.width / 2 - drawer.current.width / 2;
            lifegameContainer.current.y = app.current.screen.height / 2 - drawer.current.height / 2;
        }
    },[props.canvasSize]);

    useEffect(()=>{
        if(props.initialize){
            if(props.state.mode == "play"){
                drawer.current.isEdit = false;
                if(props.state.status == "run"){
                    if(!drawer.current.isStarted){
                        drawer.current.setup();
                    }
                    if(drawer.current.isStarted){
                        drawer.current.start(); 
                    }
                }else{
                    if(drawer.current.isStarted){
                        drawer.current.stop();
                    }
                }
            }else{
                drawer.current.isEdit = true;
                drawer.current.editMode = props.state.status;
            }

        }
        if(props.initialize == false){
            drawer.current.reset();
            props.setInitialize(true);
        }
    },[props.state, props.initialize]);

    return(
        <div className="h-100 w-100" id="pixi-content"></div>
    );
}

export default Content_PIXI;