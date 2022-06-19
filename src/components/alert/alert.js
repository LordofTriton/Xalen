import React, { useState, useEffect } from 'react'
import './alert.css'

const Alert = ({CortexControl}) => {
    let info = CortexControl.alert;
    let control = CortexControl.setAlert;
    let theme = CortexControl.theme;

    return(
        <>
            <div className="dimmer"></div>
            <div className="alertContainer" style={{backgroundColor: theme === "Light" ? "whitesmoke" : "hsla(0, 0%, 7%, 0.952)"}}>
                <div className="alertHeader">
                    <h3 className="alertTitle">{info.title}</h3>
                </div>
                <div className="alertContent">
                    <h3 className="alertText">{info.content}</h3>
                </div>
                <button className="alertClose" onClick={() => control(null)}>{info.button}</button>
            </div>
        </>
    )
}

export default Alert;