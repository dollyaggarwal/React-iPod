import React from "react";

class Wallpaper extends React.Component{
    render(){
        const {active} =this.props;
        return(
          <div className="wallpaper">
            <h2>Wallpaper Select</h2>
            <ul>
                    {["Wallpaper1","Wallpaper2","Wallpaper3"].map((element, index)=>{
                        return active === index? <li key={index} className="active theme-li">&nbsp; {element}</li>:
                            <li className="active theme-li" key={index}>&nbsp; {element}</li>   
                    })}
                </ul>
          </div>
        )
    }
}
export default Wallpaper;