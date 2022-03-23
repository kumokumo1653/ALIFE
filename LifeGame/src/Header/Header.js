import React, {useState, useEffect} from "react";
import {AiOutlineHome} from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import {BsFillPencilFill, BsFillEraserFill} from "react-icons/bs";
import { VscDebugRestart, VscDebugStart, VscDebugPause } from "react-icons/vsc";
import { RiEditBoxFill, RiEditBoxLine } from "react-icons/ri";
import "./style.css";

export default function Header(props){

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
    return(
        <div className="d-flex justify-content-between align-items-center header">
            <AiOutlineHome className="header-icon"/>
            {(()=>{
                if(props.state.mode == "play"){
                    return(
                        <div className="d-flex justify-content-around align-items-center">
                            <VscDebugRestart className="header-icon" onClick={()=>{props.setInitialize(false)}}/>
                            {props.state.status == "run" ? 
                                <VscDebugPause className="header-icon" onClick={()=>{setStatus("stop")}}/>
                                :
                                <VscDebugStart className="header-icon" onClick={()=>{setStatus("run")}}/>
                            }
                            <RiEditBoxLine className="header-icon" onClick={()=>{setMode("edit")}}/>
                        </div>
                    );
                }else{
                    return(
                        <div className="d-flex justify-content-around align-items-center">
                            {props.state.status == "write" ? 
                                <div className="">
                                    <BsFillPencilFill className="header-icon select"/>
                                    <BsFillEraserFill className="header-icon" onClick={()=>{setStatus("erase")}}/>
                                </div>
                                :
                                <div className="">
                                    <BsFillPencilFill className="header-icon" onClick={()=>{setStatus("write")}}/>
                                    <BsFillEraserFill className="header-icon select"/>
                                </div>
                            }
                            <RiEditBoxFill className="header-icon" onClick={()=>{setMode("play")}}/>
                        </div>
                    );
                }
            })()}
            <FiHelpCircle className="header-icon"/>
        </div>
    );
}
