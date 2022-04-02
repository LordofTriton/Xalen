import React, { useEffect, useState } from 'react'

//Components
import Title from './components/title/title';
import SideNav from './components/sideNav/sideNav';
import TopNav from './components/topNav/topNav';
import ChatWindow from './components/chatWindow/chatWindow';
import Hook from './components/Hook/hook';

//Images
import lightBckg from './images/lightThemeBckg.png';
import darkBckg from './images/darkThemeBckg.png';
import PopMenu from './components/popMenu/popMenu';

const Cortex = () => {
    const [titleDisplay, setTitleDisplay] = useState(true)
    const [botState, setBotState] = useState("Online");
    const [theme, setTheme] = useState(localStorage.getItem("EkkoTheme") ? localStorage.getItem("EkkoTheme") : "Dark")
    const [popMenuState, setPopMenuState] = useState(false)
    const [throwHook, setThrowHook] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    function toggleTheme() {
        if (theme === "Light") {
            setTheme("Dark")
            localStorage.setItem("EkkoTheme", "Dark")
        }
        else {
            setTheme("Light")
            localStorage.setItem("EkkoTheme", "Light")
        }
    }

    function togglePopMenu() {
        setPopMenuState(!popMenuState)
    }

    useEffect(() => {
        document.title = "Ekko";
    })

    if (!loggedIn) setTimeout(() => {setThrowHook(true); setLoggedIn(true)}, 60000)

    return(
        <div className="displayContent" 
            style={{backgroundImage: theme === "Light" ? "url("+lightBckg+")" : "url("+darkBckg+")"}}>
            <Title toggle={titleDisplay} control={setTitleDisplay} theme={theme} />
            <TopNav botState={botState} theme={theme} togglePopMenu={togglePopMenu} popMenuState={popMenuState} />
            <SideNav botState={botState} theme={theme} togglePopMenu={togglePopMenu} />
            <ChatWindow botState={botState} setBotState={setBotState} theme={theme} />
            <PopMenu toggle={popMenuState} control={setPopMenuState} theme={theme} toggleTheme={toggleTheme} />
            <Hook toggle={throwHook} control={setThrowHook} />
        </div>
    )
}

export default Cortex;