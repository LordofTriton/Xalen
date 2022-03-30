import React from 'react'
import './popMenu.css'

//Images
import logo from '../../images/Bot/headphones.png'
import switchIcon from '../../images/switch.png'

const PopMenu = ({toggle, control, theme, toggleTheme}) => {
    return(
        <>
            <div className="dimmer" onClick={() => control(false)} 
                style={{display: toggle ? "block" : "none", opacity:  toggle ? "1" : "0"}}>
            </div>
            <div className="popMenuContainer" style={{marginTop: toggle ? "0px" : "-100vh", backgroundColor: theme === "Light" ? "white" : "#121212"}}>
                <img className="popMenuLogo" src={logo} alt="logo" />
                <div className="themeButton" onClick={() => toggleTheme()} style={{backgroundColor: theme === "Light" ? "#E5E5E5" : "white"}}>
                    <h3 className="themeCurrent">{theme === "Light" ? "Dark Theme" : "Light Theme"} <span><img className="switch" src={switchIcon} alt="switch" /></span></h3>
                </div>
                <h3 className="popMenuCopy">&copy; Joshua Agboola 2022</h3>
            </div>
        </>
    )
}

export default PopMenu;