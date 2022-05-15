import React, { useState } from 'react'
import './title.css'
import './loader.css'

//Images
import logo from '../../images/logo1.png';
import lightBckg from '../../images/lightThemeBckg.png';
import darkBckg from '../../images/dark1.jpg';

const Title = ({CortexControl}) => {
    let toggle = CortexControl.titleDisplay;
    let control = CortexControl.setTitleDisplay;
    let theme = CortexControl.theme;

    setTimeout(() => control(false), 10000)
    
    return(
        <div className="titleContainer" style={{marginLeft: toggle ? "0px" : "-100vw", backgroundImage: theme === "Light" ? "url("+lightBckg+")" : "url("+darkBckg+")"}}>
            {/* <img className="titleLogo" src={logo} alt="logo" /> */}
            {/* <div className="titleProfile" style={{backgroundImage: "url("+profilePicture+")"}}></div>
            <div className="titleLoader" style={{width: ((loader / 10) * 50) + "vw", display: toggle ? "block" : "none"}}></div> */}
            <div class="drawing" id="loading">
                <div class="loading-dot"></div>
            </div>
        </div>
    )
}

export default Title;