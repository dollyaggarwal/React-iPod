import React from "react";
import BatImg from  "../static/battery.png";
import "../css/navbar.css";

class Navbar extends React.Component{
    constructor(){
        super();
        this.state={
            time:this.getCurrentTime(),
        }
    }

    getCurrentTime(){
        const Today = new Date();
        var time = Today.getHours() + ":" + Today.getMinutes();
        if(Today.getMinutes()<10){
            time = Today.getHours() + ":0" + Today.getMinutes();
        }
        return time;
    }
    render(){
        const {time} = this.state;
        return(
            <>
            <div className="bar">
                {<h5 className="heading">ipod</h5>}
                <h3 className="time">{time}</h3>
                {
                    <div className="right-container-nav">
                        <img className="battery" src={BatImg} alt="Battery"/>
                    </div>
                }
            </div>
            </>
        );
    }
}
export default Navbar;