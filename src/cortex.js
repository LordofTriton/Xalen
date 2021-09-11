import React, { useEffect, useState } from 'react'

//Components
import Title from './components/title/title';
import SideNav from './components/sideNav/sideNav';
import TopNav from './components/topNav/topNav';
import ChatWindow from './components/chatWindow/chatWindow';

const Cortex = () => {
    const [titleDisplay, setTitleDisplay] = useState(true)

    useEffect(() => {
        document.title = "Zeus"
    })

    return(
        <div className="displayContent">
            <Title toggle={titleDisplay} control={setTitleDisplay} />
            <TopNav />
            <SideNav />
            <ChatWindow />
        </div>
    )
}

export default Cortex;