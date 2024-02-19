import React from "react";
import "../css/display.css";
import Navbar from "./Navbar";
import Lockscreen from "./Lockscreen";

class Display extends React.Component{
    render(){
        return(
            <>
            <Navbar/>
            <Lockscreen/>
            </>
        )
    }
}
export default Display;