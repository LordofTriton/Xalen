import React, { useState, useEffect } from 'react'
import './popMenu.css'

//Images
import logo from '../../images/logo1.png'
import switchIcon from '../../images/switch.png'
import infoIcon from '../../images/info.png'
import lightBckg from '../../images/lightThemeBckg.png';
import darkBckg from '../../images/dark1.jpg';

const PopMenu = ({CortexControl}) => {
    const [menuPage, setMenuPage] = useState("Buttons");

    let toggle = CortexControl.popMenuState;
    let control = CortexControl.setPopMenuState;
    let theme = CortexControl.theme;
    let toggleTheme = CortexControl.toggleTheme;
    let censor = CortexControl.censor;
    let toggleCensor = CortexControl.toggleCensor;
    let setInfoPage = CortexControl.setInfoPage;
    let profilePicture = CortexControl.profilePicture;

    useEffect(() => {
        if (!toggle) setMenuPage("Buttons")
    }, [toggle])

    return(
        <>
            <div className="dimmer" onClick={() => control(false)} 
                style={{display: toggle ? "block" : "none", opacity:  toggle ? "1" : "0"}}>
            </div>
            <div className="popMenuContainer" style={{right: toggle ? null : "-100vw", backgroundImage: theme === "Light" ? "url("+lightBckg+")" : "url("+darkBckg+")"}}>
                {/* <img className="popMenuLogo" src={logo} alt="logo" /> */}
                <div className="popMenuProfile" style={{backgroundImage: "url("+profilePicture+")"}}></div>
                {
                    menuPage === "Buttons" ?
                    <>
                        <div className="themeButton" onClick={() => toggleTheme()} style={{backgroundColor: theme === "Light" ? "whitesmoke" : "white"}}>
                            <h3 className="themeCurrent">Dark Theme <span><img className="switch" src={switchIcon} alt="switch" style={{transform: theme === "Light" ? "rotate(180deg) translate(0px, 23px)" : null}} /></span></h3>
                        </div>
                        <div className="themeButton" onClick={() => toggleCensor()} style={{backgroundColor: theme === "Light" ? "whitesmoke" : "white"}}>
                            <h3 className="themeCurrent">Censor <span><img className="switch" src={switchIcon} alt="switch" style={{transform: censor === "Off" ? "rotate(180deg) translate(0px, 23px)" : null}} /></span></h3>
                        </div>
                        <div className="themeButton" onClick={() => setInfoPage(true)} style={{backgroundColor: theme === "Light" ? "whitesmoke" : "white"}}>
                            <h3 className="themeCurrent">About/Info <span><img className="info" src={infoIcon} alt="info" /></span></h3>
                        </div>
                    </>
                    : null
                }
                {
                    menuPage === "Info" ?
                    <>
                        <hr className="divider" />
                        <h3 className="popMenuInfoTitle" style={{color: theme === "Light" ? "dimgray" : "lightgray"}}>About Xalen</h3>
                        <h3 className="popMenuInfo" style={{color: "var(--blue)"}}>Xalen is a self learning conversational chatbot designed to hold funny and witty conversations with users through artificial intellignece methods that enable the program to communicate like an actual human being.</h3>
                        <hr className="divider" />
                        <h3 className="popMenuInfoTitle" style={{color: theme === "Light" ? "dimgray" : "lightgray"}}>Developer</h3>
                        <h3 className="popMenuInfo" style={{color: "var(--blue)"}}>Joshua Agboola</h3>
                        <hr className="divider" />
                        <h3 className="popMenuInfoTitle" style={{color: theme === "Light" ? "dimgray" : "lightgray"}}>Phone</h3>
                        <h3 className="popMenuInfo" style={{color: "var(--blue)"}}>+234 7065194708</h3>
                        <hr className="divider" />
                        <h3 className="popMenuInfoTitle" style={{color: theme === "Light" ? "dimgray" : "lightgray"}}>Email</h3>
                        <h3 className="popMenuInfo" style={{color: "var(--blue)"}}>agboola918@gmail.com</h3>
                    </>
                    : null
                }
            </div>
        </>
    )
}

export default PopMenu;