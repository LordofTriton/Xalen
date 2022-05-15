import React, { useEffect, useState } from 'react'

//Components
import Title from './components/title/title';
import TopNav from './components/topNav/topNav';
import ChatWindow from './components/chatWindow/chatWindow';
import Offline from './components/offline/offline';

//Images
import lightBckg from './images/lightThemeBckg.png';
import darkBckg from './images/dark1.jpg';
import PopMenu from './components/popMenu/popMenu';
import InfoPage from './components/infoPage/infoPage';

import profilePicture from './images/123-1237918_small.jpg'

const Cortex = () => {
    const [titleDisplay, setTitleDisplay] = useState(true)
    const [botState, setBotState] = useState("Online");
    const [theme, setTheme] = useState(localStorage.getItem("XalenTheme") ? localStorage.getItem("XalenTheme") : "Light")
    const [popMenuState, setPopMenuState] = useState(false)
    const [censor, setCensor] = useState(localStorage.getItem("XalenCensor") ? localStorage.getItem("XalenCensor") : "Off")
    const [infoPage, setInfoPage] = useState(false)

    function toggleTheme() {
        if (theme === "Light") {
            setTheme("Dark")
            localStorage.setItem("XalenTheme", "Dark")
        }
        else {
            setTheme("Light")
            localStorage.setItem("XalenTheme", "Light")
        }
    }

    function toggleCensor() {
        if (censor === "On") {
            setCensor("Off")
            localStorage.setItem("XalenCensor", "Off")
        }
        else {
            setCensor("On")
            localStorage.setItem("XalenCensor", "On")
        }
    }

    function togglePopMenu() {
        if (botState === "Online") {
            setPopMenuState(!popMenuState)
            setInfoPage(false)
        }
    }

    useEffect(() => {
        document.title = "Xalen";
    })

    const CortexControl = {
        profilePicture,
        titleDisplay,
        setTitleDisplay,
        botState,
        setBotState,
        theme,
        setTheme,
        popMenuState,
        setPopMenuState,
        censor,
        setCensor,
        togglePopMenu,
        toggleTheme,
        toggleCensor,
        infoPage,
        setInfoPage
    }

    return(
        <div className="backDrop">
            <Title CortexControl={CortexControl} />
            <div className="displayContent" style={{backgroundImage: theme === "Light" ? "url("+lightBckg+")" : "url("+darkBckg+")"}}>
                <TopNav CortexControl={CortexControl} />
                <ChatWindow CortexControl={CortexControl} />
                <PopMenu CortexControl={CortexControl} />
                <Offline CortexControl={CortexControl} />
                <InfoPage CortexControl={CortexControl} />
            </div>
        </div>
    )
}

export default Cortex;