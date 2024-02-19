import React from "react";
import '../css/wheel.css';
import { FaForward } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa6";
import { IoPlay } from "react-icons/io5";
import { IoPause } from "react-icons/io5";

class Wheel extends React.Component{

    render(){
        return(
            <div className="wheel-container" id="wheel-container">
            <div className="wheel" id="wheel">
                <div className="controll" id="menu">
                    <div>MENU</div>
                </div>
                <div className="controll" id="forward">
                <FaForward />
                </div>
                <div className="controll" id="play-pause">
                    <div>
                    <IoPlay />
                    <IoPause />
                    </div>
                </div>
                <div className="controll" id="reverse">
                <FaBackward />
                </div>
            </div>

            <div className="blank" id="blank">

            </div>
            </div>
        )
    }
}

export default Wheel;