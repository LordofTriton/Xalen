import React, { useState } from 'react'
import './topNav.css'

//Components
import InfoBox from '../infoBox/infoBox'

//Images
import logo from '../../images/logo1.png'
import menuIcon from '../../images/menu1.png'
import cancelIcon from '../../images/close.png'

const TopNav = ({botState, theme, togglePopMenu, popMenuState}) => {
    const [infoBoxOpen, setInfoBoxOpen] = useState(false)

    return(
        <>
            <div className="topNav" style={{backgroundColor: theme === "Light" ? "white" : "#121212"}}>
                    <img className="topNavLogo" src={logo} alt="logo" />
                    <h3 className="topNavTitle">Zeus</h3>
                    <h4 className="topNavStatus" style={{color: botState === "Online" ? "#ff9e00ff" : "dimgray"}}>
                        {botState}
                    </h4>
                <img className="topNavMenuButton" src={popMenuState ? cancelIcon : menuIcon} alt="pic" onClick={() => {togglePopMenu()}} />
            </div>

            <InfoBox toggle={infoBoxOpen} control={setInfoBoxOpen} />
        </>
    )
}

export default TopNav;