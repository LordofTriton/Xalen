import React from 'react'
import './sideNav.css'

//Images
import logo from '../../images/logo1.png'
import menuIcon from '../../images/menu.png'

const SideNav = ({theme, togglePopMenu}) => {
    return(
        <div className="sideNav" style={{backgroundColor: theme === "Light" ? "white" : "#121212"}}>
            <img className="sideNavLogo" src={logo} alt="logo" />
            <div className="sideNavButtonGallery">
                <img className="sideNavButton" src={menuIcon} alt="Menu" onClick={() => {togglePopMenu()}} />
                <h3 className="sideNavButtonText">MENU</h3>
                <hr />
                <h3 className="sideNavTitle">Xalen</h3>
            </div>
        </div>
    )
}

export default SideNav;