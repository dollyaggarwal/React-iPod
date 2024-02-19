import React from "react";
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