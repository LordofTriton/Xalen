import React, { useState } from 'react'
import './sideNav.css'

//Components
import InfoBox from '../infoBox/infoBox'

//Images
import logo from '../../images/Bot/bot.png'
import logoOffline from '../../images/Bot/404.png'
import menuIcon from '../../images/menu1.png'

const SideNav = ({botState, theme, togglePopMenu}) => {
    const [infoBoxOpen, setInfoBoxOpen] = useState(false)

    return(
        <div className="sideNav" style={{backgroundColor: theme === "Light" ? "white" : "#121212"}}>
            <img className="sideNavLogo" src={botState === "Online" ? logo : logoOffline} alt="logo" />
            <div className="sideNavButtonGallery">
                <hr />
                <img className="sideNavButton" src={menuIcon} alt="Menu" onClick={() => {togglePopMenu()}} />
                <hr />
                <h3 className="sideNavTitle">Ekko</h3>
                <h4 className="sideNavStatus" style={{color: botState === "Online" ? "#7FACFA" : "dimgray"}}>
                    {botState}
                </h4>
            </div>

            <InfoBox toggle={infoBoxOpen} control={setInfoBoxOpen} theme={theme} />
        </div>
    )
}

export default SideNav;