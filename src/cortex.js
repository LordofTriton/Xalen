import React, { useEffect, useState } from 'react'

//Components
import Title from './components/title/title';
import SideNav from './components/sideNav/sideNav';
import TopNav from './components/topNav/topNav';
import ChatWindow from './components/chatWindow/chatWindow';

const Cortex = () => {
    const [titleDisplay, setTitleDisplay] = useState(true)
    const [botState, setBotState] = useState("Online");

    useEffect(() => {
        document.title = "Zeus";
    })

    return(
        <div className="displayContent">
            <Title toggle={titleDisplay} control={setTitleDisplay} />
            <TopNav botState={botState} />
            <SideNav botState={botState} />
            <ChatWindow botState={botState} setBotState={setBotState} />
        </div>
    )
}

export default Cortex;