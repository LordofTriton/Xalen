import React, { useState } from 'react'
import './sideNav.css'

//Components
import InfoBox from '../infoBox/infoBox'

//Images
import logo from '../../images/logo1.png'
import menuIcon from '../../images/menu.png'

const SideNav = ({theme, togglePopMenu}) => {
    const [infoBoxOpen, setInfoBoxOpen] = useState(false)

    return(
        <div className="sideNav" style={{backgroundColor: theme === "Light" ? "white" : "#121212"}}>
            <img className="sideNavLogo" src={logo} alt="logo" />
            <div className="sideNavButtonGallery">
                <img className="sideNavButton" src={menuIcon} alt="Menu" onClick={() => {togglePopMenu()}} />
                <h3 className="sideNavButtonText">MENU</h3>
                <hr />
                <h3 className="sideNavTitle">Triton</h3>
            </div>

            <InfoBox toggle={infoBoxOpen} control={setInfoBoxOpen} theme={theme} />
        </div>
    )
}

export default SideNav;