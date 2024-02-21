import React from "react";
import "../css/theme.css";

class Themes extends React.Component{
    render(){
        const {active} = this.props;
        return(
            <div className="theme">
                <h2 className="">Theme Select</h2>
                <ul>
                    {["Snow White", "Black","USA GOLD", "Space Gray", "Pearl"].map((element, index)=>{
                        return active === index? <li key={index} className="active theme-li">&nbsp; {element}</li>:
                            <li className="active theme-li" key={index}>&nbsp; {element}</li>   
                    })}
                </ul>
            </div>
        )
    }
}
export default Themes;