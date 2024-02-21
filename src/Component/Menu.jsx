import React from "react";
import game from "../static/game.jpg";
import music from "../static/music.jpg";
import settings from "../static/settings.png";
import "../css/menu.css";
class Menu extends React.Component{
    render(){
        const {active,menuItems, songImgUrl} = this.props;
        return(
           <div className="menu-container">
            <div className="menu">
                <ul>
                    {
                        menuItems.map((element,index)=>{
                            return active === index? <li key={index}>&npsp; {element}</li>:
                            <li key={index}>&npsp; {element}</li>
                        })
                    }
                </ul>
            </div>
            <div className="leaf">
            {active === 0 && <img src={songImgUrl} alt="" className="leaf-img"></img>}
            {active === 1 && <img src={music} alt="music" className="leaf-img"></img>}
            {active === 2 && <img src={game} alt="game" className="leaf-img"></img>}
            {active === 3 && <img src={settings} alt="settings" className="leaf-img"></img>}

            </div>
           </div>
        )
    }
}
export default Menu;