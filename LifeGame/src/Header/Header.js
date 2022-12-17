import React, {useState, useEffect} from "react";
import {AiOutlineHome} from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import {BsFillPencilFill, BsFillEraserFill} from "react-icons/bs";
import { VscDebugRestart, VscDebugStart, VscDebugPause } from "react-icons/vsc";
import { RiEditBoxFill, RiEditBoxLine } from "react-icons/ri";
import { motion } from "framer-motion";
import "./style.css";

export default function Header(props){

    const [headerStatus, setHeaderStatus] = useState("opening");
    const setMode = (mode) =>{
        if(mode == "play"){
            props.setState({
                "mode":mode,
                "status": "stop"
            });
        }else{
            props.setState({
                "mode": mode,
                "status": "write"
            });
        }
    };
    const setStatus = (status) =>{
        props.setState({
            "mode": props.state.mode,
            "status": status
        });
    };
    const setInit = (param) =>{
        props.setInitialize(param);
    };

    const mouseEnter = (e) =>{
        setHeaderStatus("opening");
    };

    const mouseLeave = (e) =>{
        setHeaderStatus("closing");
    }

    const animationVariants = {
        opening: { opacity: 1 },
        closing: { opacity: 0 },
    }
    return(
        <motion.div animate={headerStatus} initial="opening" variants={animationVariants} onAnimationComplete={definition => console.log(definition)}
         className={"d-flex justify-content-between align-items-center header"} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <AiOutlineHome  className="header-icon icon-cursor"/>
            {(()=>{
                if(props.state.mode == "play"){
                    return(
                        <div className="d-flex justify-content-around align-items-center">
                            <VscDebugRestart className="header-icon icon-cursor" onClick={()=>{setInit(false)}}/>
                            {props.state.status == "run" ? 
                                <VscDebugPause className="header-icon icon-cursor" onClick={()=>{setStatus("stop")}}/>
                                :
                                <VscDebugStart className="header-icon icon-cursor" onClick={()=>{setStatus("run")}}/>
                            }
                            <RiEditBoxLine className="header-icon icon-cursor" onClick={()=>{setMode("edit")}}/>
                        </div>
                    );
                }else{
                    return(
                        <div className="d-flex justify-content-around align-items-center">
                            {props.state.status == "write" ? 
                                <div className="">
                                    <BsFillPencilFill className="header-icon icon-cursor select"/>
                                    <BsFillEraserFill className="header-icon icon-cursor" onClick={()=>{setStatus("erase")}}/>
                                </div>
                                :
                                <div className="">
                                    <BsFillPencilFill className="header-icon icon-cursor" onClick={()=>{setStatus("write")}}/>
                                    <BsFillEraserFill className="header-icon icon-cursor select"/>
                                </div>
                            }
                            <RiEditBoxFill className="header-icon icon-cursor" onClick={()=>{setMode("play")}}/>
                        </div>
                    );
                }
            })()}
            <FiHelpCircle className="header-icon icon-cursor"/>
        </motion.div>
    );
}
