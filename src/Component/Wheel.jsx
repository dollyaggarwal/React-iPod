import React from "react";
import '../css/wheel.css';
import { FaForward } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa6";
import { IoPlay } from "react-icons/io5";
import { IoPause } from "react-icons/io5";
import ZingTouch from "zingtouch";

class Wheel extends React.Component{
    constructor(){
        super();
        this.this.state={
            angle:0,
        }
    }
    render(){
        const {changeMenuForward,active,currentMenu,theme,wheelColor} = this.props;
        return(
            <div className="wheel-container" id="wheel-container">
            <div className="wheel" id="wheel" style={{backgroundColor:wheelColor}}>
                <div className="controll" id="menu">
                    <div style={{color:theme}} >MENU</div>
                </div>
                <div className="controll" id="forward">
                <FaForward style={{color:theme}} />
                </div>
                <div className="controll" id="play-pause">
                    <div>
                    <IoPlay style={{color:theme}} />
                    <IoPause style={{color:theme}} />
                    </div>
                </div>
                <div className="controll" id="reverse">
                <FaBackward style={{color:theme}} />
                </div>
            </div>

            <div className="blank" id="blank">

            </div>
            </div>
        )
    }

    wheelControll=(e)=>{
        const {updateActiveMenu, currentMenu} = this.props;
        if(e.detail.distanceFromOrigin === 0){
            this.angle = e.detail.angle;
        }
        if(Math.abs(this.angle-e.detail.angle)>100){
            this.angle = Math.abs(e.detail.angle);
            if(e.detail.distanceFromLast === 0)
                return;
            else if(e.detail.distanceFromLast < 0)
             updateActiveMenu(1,currentMenu);
            else
                updateActiveMenu(0,currentMenu); 
        }
        else if(Math.abs(this.angle-e.detail.angle) > 15){
            this.angle = Math.abs(e.detail.angle);
            if(e.detail.distanceFromLast === 0)
            return;
        else if(e.detail.distanceFromLast > 0)
        updateActiveMenu(1,currentMenu);
        else
        updateActiveMenu(0,currentMenu);
        }
    }
    componentDidMount(){
        const {changeMenuBackward, togglePlayPause,seekSongForward, seekSongBackward} = this.props;

        const wheelControll = this.wheelControll;
        const wheel = document.getElementById("wheel");
        const activeRegion = ZingTouch.Region("wheel");
        const menuIcon = document.getElementById("menu");
        const playPause = document.getElementById("play-pause");
        const reverse = document.getElementById("reverse");
        const forward = document.getElementById("forward");

        const longTapGesture = new ZingTouch.Tap({
            maxDelay:10000,
            numInput:1,
            tolerance:1,
        })

        activeRegion.bind(menuIcon,"tap",function(e){
            changeMenuBackward();
        })
        activeRegion.bind(wheel,"rotate",function(e){
            wheelControll(e);
        })
        activeRegion.bind(playPause,"tap",function(e){
            togglePlayPause();
        })
        activeRegion.bind(reverse,"longTapGesture",function(e){
            seekSongBackward();
        })
    }
}

export default Wheel;