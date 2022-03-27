import React, { useState } from 'react'
import './sideNav.css'

//Components
import InfoBox from '../infoBox/infoBox'

//Images
import logo from '../../images/logo1.png'
import menuIcon from '../../images/menu1.png'

const SideNav = ({botState, theme, togglePopMenu}) => {
    const [infoBoxOpen, setInfoBoxOpen] = useState(false)

    return(
        <div className="sideNav" style={{backgroundColor: theme === "Light" ? "white" : "#121212"}}>
            <img className="sideNavLogo" src={logo} alt="logo" />
            <div className="sideNavButtonGallery">
                <hr />
                <img className="sideNavButton" src={menuIcon} alt="Menu" onClick={() => {togglePopMenu()}} />
                {/* <h3 className="sideNavMenuOption" onClick={() => {setInfoBoxOpen(true)}}>Info</h3>
                <h3 className="sideNavMenuOption" onClick={() => {toggleSideMenu()}}>{theme === "Light" ? "Dark Theme" : "Light Theme"}</h3> */}
                <hr />
                <h3 className="sideNavTitle">Zeus</h3>
                <h4 className="sideNavStatus" style={{color: botState === "Online" ? "#ff9e00ff" : "dimgray"}}>
                    {botState}
                </h4>
            </div>

            <InfoBox toggle={infoBoxOpen} control={setInfoBoxOpen} theme={theme} />
        </div>
    )
}

export default SideNav;