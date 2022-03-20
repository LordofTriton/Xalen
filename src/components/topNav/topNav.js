import React, { useState } from 'react'
import './topNav.css'

//Components
import InfoBox from '../infoBox/infoBox'

//Images
import logo from '../../images/logo1.png'
import infopic from '../../images/info.png'

const TopNav = ({botState}) => {
    const [infoBoxOpen, setInfoBoxOpen] = useState(false)

    return(
        <>
            <div className="topNav">
                    <img className="topNavLogo" src={logo} alt="logo" />
                    <h3 className="topNavTitle">Zeus</h3>
                    <h4 className="topNavStatus" style={{color: botState === "Online" ? "#ff9e00ff" : "dimgray"}}>
                        {botState}
                    </h4>
                <img className="topNavMenuButton" src={infopic} alt="pic" onClick={() => {setInfoBoxOpen(true)}} />
            </div>

            <InfoBox toggle={infoBoxOpen} control={setInfoBoxOpen} />
        </>
    )
}

export default TopNav;