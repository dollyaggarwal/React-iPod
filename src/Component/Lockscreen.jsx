import React from "react";
import "../css/lockscreen.css"

class Lockscreen extends React.Component{
    render(){
        return(
            <>
              <div className="bottom-div-lock">
                <h3>Press Center Button to unlock!</h3>
              </div>
            </>
        )
    }
}
export default Lockscreen;