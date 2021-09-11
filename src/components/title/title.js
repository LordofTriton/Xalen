import React, { useState } from 'react'
import './title.css'

//Images
import logo from '../../images/logo1.png';

const Title = ({toggle, control}) => {
    const [loader, setLoader] = useState(0)


    setTimeout(() => setLoader(loader + 1), 1000)
    if (loader === 11) control(false)
    
    return(
        <div className="titleContainer" style={{marginLeft: toggle ? "0px" : "-100vw"}}>
            <img className="titleLogo" src={logo} alt="logo" />
            <h3 className="titleTitle">
                <p style={{animationDuration: "0.5s"}}>Z</p>
                <p style={{animationDuration: "2s"}}>E</p>
                <p style={{animationDuration: "1s"}}>U</p>
                <p style={{animationDuration: "1.5s"}}>S</p>
            </h3>
            <div className="titleLoader" style={{width: ((loader / 10) * 100) + "vw", display: toggle ? "block" : "none"}}></div>
        </div>
    )
}

export default Title;