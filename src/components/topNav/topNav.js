import React from 'react'
import './topNav.css'

//Images
import logo from '../../images/logo1.png'
import menuIcon from '../../images/menu.png'
import cancelIcon from '../../images/close.png'

const TopNav = ({CortexControl}) => {
    let theme = CortexControl.theme;
    let togglePopMenu = CortexControl.togglePopMenu;
    let popMenuState = CortexControl.popMenuState;
    let infoPage = CortexControl.infoPage;
    let botState = CortexControl.botState;
    let profilePicture = CortexControl.profilePicture;

    return(
        <>
            <div className="topNav" style={{backgroundColor: theme === "Light" ? "white" : "#121212"}}>
                    {/* <img className="topNavLogo" src={logo} alt="logo" /> */}
                    <div className="topNavProfile" style={{backgroundImage: "url("+profilePicture+")"}}></div>
                    <div style={{width: "fit-content", height: "fit-content", float: "left"}}>
                        <h3 className="topNavTitle">Xalen</h3>
                        <div className="botStateIndicator"></div>
                    </div>
                <img className="topNavMenuButton" src={popMenuState || infoPage ? cancelIcon : menuIcon} alt="pic" onClick={() => {togglePopMenu()}} />
            </div>
        </>
    )
}

export default TopNav;