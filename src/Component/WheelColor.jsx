import React from "react";
import "../css/theme.css";

class WheelColor extends React.Component{
    render(){
        const {active} = this.props;
        return(
            <div className="wheelColor">
                <h2>Wheel Color Select</h2>
                <ul>
                    {["Black","White","Brown"].map((element, index)=>{
                        return active === index? <li key={index} className="active theme-li">&nbsp; {element}</li>:
                            <li className="active theme-li" key={index}>&nbsp; {element}</li>   
                    })}
                </ul>
            </div>
        )
    }
}
export default WheelColor;