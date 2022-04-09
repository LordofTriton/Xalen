import React, { useState } from 'react'
import './topNav.css'

//Components
import InfoBox from '../infoBox/infoBox'

//Images
import logo from '../../images/logo1.png'
import menuIcon from '../../images/menu.png'
import cancelIcon from '../../images/close.png'

const TopNav = ({theme, togglePopMenu, popMenuState}) => {
    const [infoBoxOpen, setInfoBoxOpen] = useState(false)

    return(
        <>
            <div className="topNav" style={{backgroundColor: theme === "Light" ? "white" : "#121212"}}>
                    <img className="topNavLogo" src={logo} alt="logo" />
                    <h3 className="topNavTitle">Xalen</h3>
                <img className="topNavMenuButton" src={popMenuState ? cancelIcon : menuIcon} alt="pic" onClick={() => {togglePopMenu()}} />
            </div>

            <InfoBox toggle={infoBoxOpen} control={setInfoBoxOpen} />
        </>
    )
}

export default TopNav;