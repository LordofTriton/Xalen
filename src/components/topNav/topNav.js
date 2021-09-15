import React, { useState } from 'react'
import './topNav.css'

//Components
import InfoBox from '../infoBox/infoBox'

//Images
import logo from '../../images/logo1.png'
import menupic from '../../images/menu1.png'
import closepic from '../../images/close.png'

const TopNav = () => {
    const [menuMode, setMenuMode] = useState(false)
    const [infoBoxOpen, setInfoBoxOpen] = useState(false)

    return(
        <>
            <div className="topNav">
                <div style={{height: "100%", width: "50%", borderRadius: "0px 100px 100px 0px", boxShadow: "4px 0px 8px 0 rgba(0,0,0,0.2)", float: "left"}}>
                    <img className="topNavLogo" src={logo} alt="logo" />
                    <h3 className="topNavTitle">Zeus</h3>
                    <h4 className="topNavStatus">Online</h4>
                </div>
                <img className="topNavMenuButton" src={menuMode ? closepic:menupic} alt="pic" onClick={() => setMenuMode(!menuMode)} />
            </div>
            <div className="topNavMenu" style={{marginRight: menuMode ? "0px" : "-100vw"}}>
                <h3 className="topNavMenuOption">Settings</h3>
                <h3 className="topNavMenuOption" onClick={() => {setInfoBoxOpen(true); setMenuMode(false)}}>Info</h3>
            </div>

            <InfoBox toggle={infoBoxOpen} control={setInfoBoxOpen} />
        </>
    )
}

export default TopNav;