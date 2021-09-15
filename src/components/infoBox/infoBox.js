import React from 'react'
import './infoBox.css'

const InfoBox = ({toggle, control}) => {
    return(
        <>
            <div className="dimmer" onClick={() => control(false)} 
                style={{display: toggle ? "block" : "none", opacity:  toggle ? "1" : "0"}}>
            </div>
            <div className="infoBox" style={{marginTop: toggle ? "0px" : "-100vh"}}>
                <div className="infoBoxTop">
                    <h3 className="infoBoxInfo">
                        "A simplistic chatbot built in ReactJS. Designed to alleviate stress and lift spirits with humorous interactions and jokes. Enjoy!"
                    </h3>
                </div>
                <div className="infoBoxBottom"></div>
                <h3 className="infoBoxCredit">Built by <span style={{fontWeight: "500"}}>LordOfTriton</span></h3>
                <h3 className="infoBoxURL"><a href="https://github.com/LordofTriton">https://github.com/LordofTriton</a></h3>
            </div>
        </>
    )
}

export default InfoBox