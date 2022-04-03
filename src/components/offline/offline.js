import React from 'react'
import './offline.css'

//Images
import lightBckg from '../../images/lightThemeBckg.png';
import darkBckg from '../../images/darkThemeBckg.png';

const Offline = ({theme, botState, setBotState}) => {

    const retryConnection = () => {
        window.navigator.onLine ? setBotState("Online") : setBotState("Offline");
    }

    return(
        <>
            <div className="dimmer" style={{display: botState === "Offline" ? "block" : "none", opacity:  botState === "Offline" ? "1" : "0"}}>
            </div>
            <div className="offlineContainer" style={{display: botState === "Offline" ? "block" : "none", backgroundImage: theme === "Light" ? "url("+lightBckg+")" : "url("+darkBckg+")"}}>
                <h3 className="offlineTitle" style={{color: theme === "Light" ? "black" : "white"}}>No Internet Connection</h3>
                <button className="retryButton" onClick={() => retryConnection()}>Retry</button>
            </div>
        </>
    )
}

export default Offline;