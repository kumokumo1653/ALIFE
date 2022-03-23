import React, {useState, useEffect, useRef} from "react";
import Content from "./Contents/Content_PIXI";
import Header from "./Header/Header";
import "./default.css";


function App(){
    //mode play or edit
    //status stop or run || write erase
    const [gameState, setGameState] = useState({
        "mode": "play",
        "status": "stop"
    }); 
    //mode continue or tick
    console.log([
        window.innerHeight,
        document.documentElement.clientHeight
    ]
    );
    const [runMode, setRunMode] = useState("continue"); 
    const [initialize, setInitialize] = useState(false);
    const [canvasSize, setCanvasSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(()=>{
        window.addEventListener("resize", () => {
            setCanvasSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        });
        return () => {
            window.removeEventListener("resize", () => {
                setCanvasSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            });
        }
    },[]);
    console.dir(gameState);
    console.log(canvasSize);
    return(
        <div className="content">
            <Header state={gameState} setState={setGameState} setInitialize={setInitialize}/> 
            <Content canvasSize={canvasSize} state={gameState} runMode={runMode} initialize={initialize} setInitialize={setInitialize}/>
        </div>
    );
}
export default App;
