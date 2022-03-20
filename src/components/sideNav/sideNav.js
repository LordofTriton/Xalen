import React, { useState } from 'react'
import './sideNav.css'

//Components
import InfoBox from '../infoBox/infoBox'

//Images
import logo from '../../images/logo1.png'

const SideNav = ({botState}) => {
    const [infoBoxOpen, setInfoBoxOpen] = useState(false)

    return(
        <div className="sideNav">
            <img className="sideNavLogo" src={logo} alt="logo" />
            <div className="sideNavButtonGallery">
                <hr />
                <h3 className="sideNavMenuOption" onClick={() => {setInfoBoxOpen(true)}}>Info</h3>
                <hr />
                <h3 className="sideNavTitle">Zeus</h3>
                <h4 className="sideNavStatus" style={{color: botState === "Online" ? "#ff9e00ff" : "dimgray"}}>
                    {botState}
                </h4>
            </div>

            <InfoBox toggle={infoBoxOpen} control={setInfoBoxOpen} />
        </div>
    )
}

export default SideNav;