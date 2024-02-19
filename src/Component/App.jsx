import React from "react";
import Wheel from "./Wheel";
import Display from "./Display";
class App extends React.Component{

    render(){
        return(
            <>
            <Display/>
            <Wheel/>
            </>
         
        )
    }
}

export default App;