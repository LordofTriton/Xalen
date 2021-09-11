import React, { useState } from 'react'
import './sideNav.css'

//Images
import logo from '../../images/logo1.png'
import menupic from '../../images/menu1.png'
import closepic from '../../images/close.png'

const SideNav = () => {
    const [menuMode, setMenuMode] = useState(false)
    return(
        <div className="sideNav">
            <img className="sideNavLogo" src={logo} alt="logo" />
            <div className="sideNavButtonGallery" style={{height: menuMode ? "400px" : "300px"}}>
                <img className="sideNavButton" src={menuMode ? closepic:menupic} alt="pic" onClick={() => setMenuMode(!menuMode)} />
                <h3 className="sideNavMenuOption" style={{display: menuMode ? "block" : "none"}}>Settings</h3>
                <h3 className="sideNavMenuOption" style={{display: menuMode ? "block" : "none"}}>Info</h3>
                <h3 className="sideNavTitle">Zeus</h3>
            </div>
        </div>
    )
}

export default SideNav;