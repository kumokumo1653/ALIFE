import React, {useState, useEffect, useRef} from "react";
import Content from "./Contents/Content_PIXI";
import Header from "./Header/Header";
import "./default.css";
import { BsChevronDoubleLeft } from "react-icons/bs";


function App(){
    //mode play or edit
    //status stop or run || write or erase
    const [gameState, setGameState] = useState({
        "mode": "play",
        "status": "stop"
    }); 
    //mode continue or tick
    const [runMode, setRunMode] = useState("continue"); 
    const [initialize, setInitialize] = useState(false);
    const [canvasSize, setCanvasSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });

    useEffect(()=>{
        const func = () =>{
            setCanvasSize({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            });
        };
        //mount
        window.addEventListener("resize", func);
        //unmont
        return () => {
            window.removeEventListener("resize", func);
        }
    },[]);
    console.dir(gameState);
    console.log(canvasSize);
    console.log([window.innerWidth, document.documentElement.clientWidth]);
    console.log([window.innerHeight, document.documentElement.clientHeight]);
    return(
        <div className="content">
            <Header state={gameState} setState={setGameState} setInitialize={setInitialize}/>
            <Content canvasSize={canvasSize} state={gameState} runMode={runMode} initialize={initialize} setInitialize={setInitialize}/>
        </div>
    );
}
export default App;
