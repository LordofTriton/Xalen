import React, { useEffect, useState } from 'react'

//Components
import Title from './components/title/title';
import SideNav from './components/sideNav/sideNav';
import TopNav from './components/topNav/topNav';
import ChatWindow from './components/chatWindow/chatWindow';
import Offline from './components/offline/offline';

//Images
import lightBckg from './images/lightThemeBckg.png';
import darkBckg from './images/darkThemeBckg.png';
import PopMenu from './components/popMenu/popMenu';

const Cortex = () => {
    const [titleDisplay, setTitleDisplay] = useState(true)
    const [botState, setBotState] = useState("Online");
    const [theme, setTheme] = useState(localStorage.getItem("XalenTheme") ? localStorage.getItem("XalenTheme") : "Light")
    const [popMenuState, setPopMenuState] = useState(false)
    const [censor, setCensor] = useState(localStorage.getItem("XalenCensor") ? localStorage.getItem("XalenCensor") : false)

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
        localStorage.setItem("XalenCensor", !censor)
        setCensor(!censor)
    }

    function togglePopMenu() {
        setPopMenuState(!popMenuState)
    }

    useEffect(() => {
        document.title = "Xalen";
    })

    return(
        <div className="displayContent" 
            style={{backgroundImage: theme === "Light" ? "url("+lightBckg+")" : "url("+darkBckg+")"}}>
            <Title toggle={titleDisplay} control={setTitleDisplay} theme={theme} />
            <TopNav botState={botState} theme={theme} togglePopMenu={togglePopMenu} popMenuState={popMenuState} />
            <SideNav botState={botState} theme={theme} togglePopMenu={togglePopMenu} />
            <ChatWindow botState={botState} setBotState={setBotState} theme={theme} censor={censor} />
            <PopMenu toggle={popMenuState} control={setPopMenuState} theme={theme} toggleTheme={toggleTheme} censor={censor} toggleCensor={toggleCensor} />
            <Offline theme={theme} botState={botState} setBotState={setBotState} />
        </div>
    )
}

export default Cortex;