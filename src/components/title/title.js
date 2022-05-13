import React, { useState } from 'react'
import './title.css'

//Images
import logo from '../../images/logo1.png';
import lightBckg from '../../images/lightThemeBckg.png';
import darkBckg from '../../images/dark1.jpg';

const Title = ({CortexControl}) => {
    const [loader, setLoader] = useState(0)
    let toggle = CortexControl.titleDisplay;
    let control = CortexControl.setTitleDisplay;
    let theme = CortexControl.theme;

    setTimeout(() => loader <= 10 ? setLoader(loader + 0.01) : control(false), 10)
    
    return(
        <div className="titleContainer" style={{marginLeft: toggle ? "0px" : "-100vw", backgroundImage: theme === "Light" ? "url("+lightBckg+")" : "url("+darkBckg+")"}}>
            <img className="titleLogo" src={logo} alt="logo" />
            {/* <h3 className="titleTitle">
                <p style={{animationDuration: "0.5s"}}>Z</p>
                <p style={{animationDuration: "2s"}}>E</p>
                <p style={{animationDuration: "1s"}}>U</p>
                <p style={{animationDuration: "1.5s"}}>S</p>
                <h3 className="titleMark">TM</h3>
            </h3> */}
            <div className="titleLoader" style={{width: ((loader / 10) * 50) + "vw", display: toggle ? "block" : "none"}}></div>
        </div>
    )
}

export default Title;