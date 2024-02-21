import React from "react";
import Wheel from "./Wheel";
import Display from "./Display";
import song1 from "../static/songs/Post Malone - White Iverson.mp3";
import song2 from "../static/songs/John Denver - Country Roads.mp3";
import song3 from "../static/songs/Sigrid - High Five.mp3";
import song4 from "../static/songs/Khalid - Young Dumb Broke.mp3";
import song5 from "../static/songs/Rick Astley - Never Gonna Give You Up.mp3";

import song1Img from "../static/Post Malone - White Iverson.png";
import song2Img from "../static/John Denver - Country Roads.jpg";
import song3Img from "../static/Sigrid - High Five.png";
import song4Img from "../static/Khalid - Young Dumb Broke.jpg";
import song5Img from "../static/Never Gonna Give You Up.png";
import wallpaper1 from "../static/wallpaper1.jpg";
import wallpaper2 from "../static/wallpaper2.jpg";
import wallpaper3 from "../static/wallpaper3.jpg";
import Case from "./Case";


class App extends React.Component{

    constructor(){
        super();
        this.state={
            active:0, //Active list items
            menuItems:["NOw Playing", "Music", "Games","Settings"],
            musicItems:[song1,song2,song3,song4,song5],
            songImgItemsUrl:[song1Img,song2Img,song3Img,song4Img,song5Img],
            wallpaperItems:[wallpaper1,wallpaper2,wallpaper3],
            songItems:["Post Malone - White Iverson","John Denver - Country Roads",
            "Sigrid - High Five","Khalid - Young Dumb Broke","Rick Astley - Never Gonna Give You Up"],
            songIndex:0, //Current song
            lengthMenuKey:{ "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3 ,10:2},  //length of a particular menu
            menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, //which menu can be rendered by key menu
            currentMenu: -2, //current menu which is lockscreen initially
            navigationStack: [], //Used for navigation forward and backward
            songUrl: song1, //current song url
            playing: false, //playing or not
            theme: "rgb(210, 210, 210)", //current body theme
            audio: new Audio(song1), //current audio file
            songImgUrl: song1Img, //current song img for now playing
            wheelColor: "white", //current wheel color
            wallpaper: 0, //current wallpaper
            noty:false, // has to show notification or not
            notifyText:"Wallpaper Changed", //notification text
        }
    }

//function for :on long press of forward button tracks are seeked forward
seekSongForward = (e) =>{
    if(this.state.currentMenu == -2)
    return;
if(this.state.playing == false)
return;

if(e.detail.interval < 250){
    this.state.audio.pause();
    let songIndex = this.state.songIndex;
    if(songIndex === this.state.songImgItemsUrl.length-1)
        songIndex=0;
    else
    songIndex++;
    
    const songUrl = this.state.songImgItemsUrl[songIndex];
    const songImgUrl = this.state.songImgUrl[songIndex];

    this.setState({songIndex:songIndex, songImgUrl:songImgUrl,songUrl:songUrl,audio:new Audio(songUrl)},
    ()=>{
        this.state.audio.play(); 
    });
    }elseif(e.detail.interval > 250 && e.detail.interval < 10000)
    {
        const interval = e.detail.interval / 100;
        this.setState((prevState)=>{
            prevState.audio.currenTime += interval;
            return prevState;
        });
    }
}    

//Reverse song function
seekSongBackward = (e) =>{
    if(this.state.currentMenu == -2)
    return;
if(this.state.playing == false)
return;

if(e.detail.interval < 250){
    this.state.audio.pause();
    let songIndex = this.state.songIndex;
    if(songIndex === 0)
        songIndex=this.state.songImgItemsUrl.length-1;
    else
    songIndex--;
    
    const songUrl = this.state.songImgItemsUrl[songIndex];
    const songImgUrl = this.state.songImgUrl[songIndex];

    this.setState({songIndex:songIndex, songImgUrl:songImgUrl,songUrl:songUrl,audio:new Audio(songUrl)},
    ()=>{
        this.state.audio.play(); 
    })
    }elseif(e.detail.interval>250 && e.detail.interval<10000)
    {
        const interval = e.detail.interval/100;
        this.setState((prevState)=>{
            prevState.audio.currenTime -=interval;
            return prevState;
        })
    }
}    

//toggle song play and pause
toggelPlayPause=()=>{
    if(this.state.currentMenu === -2)
        return;

        if(this.state.playing === true){
            this.setState({playing:false});
            this.state.audio.pause();
        }
        
        if(this.state.playing === false){
            this.setState({playing:true});
            this.state.audio.play();
        }   
}

//function to update active menu while rotating on track wheel
updateActiveMenu = (direction,menu) =>{ 
    if(menu !==-1 && menu !==1 && menu !==4 && menu !==8 && menu !==9 && menu !==10)
    return;
let min=0;
let max=0;
max = this.state.lengthMenuKey[menu];
if(direction ===1){
    if(this.state.active>=max){
        this.setState({active:min})
    }else{
        this.setState({active:this.state.active+1})
    }
}else{
    if(this.state.active<=min)
        this.setState({active:max})
    else
    this.setState({active:this.state.active-1})   
 }
}

//function for: change the theme of ipod body
setTheme = (id) =>{
    let theme = "";
    if(id === 0)
    theme = "#f0f0f0";
    elseif(id === 1)
    theme = "#555d50";
    elseif(id === 3)
    theme = "#D1CDDA";
    elseif(id === 4)
    theme = "#c4aeead";
this.setState({theme:theme,noty:true, notifyText:"Theme changed"});//notification
return;
}

//function for: change the wallpaper of ipod screen
setWallpaper = (id) =>{
    this.setState({wallpaper:id,noty:true, notifyText:"Wallpaper changed"});
    return;
}

//function for: change the color of wheel of ipod 
setWheelColor = (id)=>{
    let wheelColor="";
    if(id === 0)
    wheelColor = "#212121";
    elseif(id === 1)
    wheelColor = "white";
    elseif(id === 3)
    wheelColor = "#3E2723";
    elseif(id === 4)
    wheelColor = "#3D5AFE";
this.setState({wheelColor:wheelColor,noty:true, notifyText:"Wheel color changed" });
}

changeMenuBackward = ()=>{
    const navigationStack = this.state.navigationStack.slice();
    if(this.state.currentMenu === -2)
    return;

    else{
        const prevId = navigationStack.pop();
        this.setState({currentMenu:prevId, navigationStack:navigationStack, active:0});
        return;
  }
}

changeMenuForward = ()=>{
    const navigationStack = this.state.navigationStack.slice();
    if(fromMenu !==-2 && fromMenu!==-1 && fromMenu!==1 && fromMenu!==4
    && fromMenu!==3 && fromMenu!==8 && fromMenu!=9 && fromMenu!==0 && fromMenu!==7 && fromMenu!==10)
         return;
        if(fromMenu === -1){
            navigationStack.push(this.state.currentMenu);
            this.setState({currentMenu:id, navigationStack:navigationStack, active:0});
            return;
        }
        if(fromMenu === -2){
            navigationStack.push(this.state.currentMenu);
            this.setState({currentMenu:-1, navigationStack:navigationStack, active:0});
            return;
        }
        if(fromMenu === 7 && fromMenu === 0){
           this.toggelPlayPause();
            return;
        }
        if(fromMenu === 8){
           this.setTheme(id);
            return;
        }
        if(fromMenu === 9){
            this.setWheelColor(id);
             return;
         }
         if(fromMenu === 10){
            this.setWallpaper(id);
             return;
         }

         navigationStack.push(this.state.currentMenu);
         if(fromMenu === 4){
            this.changePlayingSongFromMusicMenu(id,navigationStack,currentMenu);
            return;
         }
         const currentMenuId = this.state.menuMapping[fromMapping][id];
         this.state({currentMenu:currentMenuId, navigationStack:navigationStack, active:0});
}   

changePlayingSongFromMusicMenu = (id,navigationStack) =>{
    const songUrl = this.state.songImgUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];
    this.state.audio.pause();
    this.setState({currenTime:7, songUrl:songUrl, navigationStack:navigationStack, 
        active:0, playing:true,songIndex:id, audio: new Audio(songUrl),songImgUrl:songImgUrl},
        ()=>{
            this.state.audio.play();
        })
        return;
    }

    setNoty = () =>{
        this.setState({noty:false});
        return;
    }

    render(){

        const {audio,active,currentMenu,menuItems,musicItems,songItems,playing,songIndex,theme,
            songUrl,songImgUrl,wheelColor,wallpaper,wallpaperItems,noty,notifyText} = this.state;
        return( 
            <>
            <Case songIndex= {songIndex} active={active} menuItems={menuItems} musicItems={musicItems} 
            currentMenuId={currentMenu} changeMenuBackward={this.changeMenuBackward} changeMenuForward={this.changeMenuForward}
            updateActiveMenu={this.updateActiveMenu} toggelPlayPause={this.toggelPlayPause} songItems={songItems} playing={playing}
            theme={theme} audio={audio} songUrl={songUrl} songImgUrl={songImgUrl} seekSongForward={this.seekSongForward}
            seekSongBackward={this.seekSongBackward} wheelColor={wheelColor} wallpaper={wallpaper} wallpaperItems={wallpaperItems}
            noty={noty} setNoty={this.setNoty} notifyText={this.notifyText}
            />
            </>
         
        )
    }
}

export default App;