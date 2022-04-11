import React, { useState, useEffect } from 'react'
import './chatWindow.css'
import axios from 'axios';

//Services
import DateTime from '../../services/dateTime';
import MatchService from '../../services/matcher';
import Override from '../../services/defaults';

//Images
import sendIcon from '../../images/send1.png'

//Defaults
let d = new Date();
let premierSpeaker = Math.random() * 10 > 5;
// premierSpeaker = true;
let baseAPIURL = "https://xalen-server.herokuapp.com/";
// baseAPIURL = "http://localhost:5000/";

// const stripMessage = ({text}) => {
//     let returnText = text;
//     returnText = returnText.replace(/[^\p{L}\s]/gu, "")
//     returnText = returnText.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, "")
//     return returnText;
// }

const ChatWindow = ({botState, setBotState, theme}) => {
    const [chatHistory, setChatHistory] = useState([])
    const [typing, setTyping] = useState(false)
    const [newMsg, setNewMsg] = useState("")
    const [currentMessage, setCurrentMessage] = useState({
        parent: "",
        content: "",
        time: d
    })
    const [atheneum, setAtheneum] = useState({})
    const [yggdrasil, setYggdrasil] = useState({})
    const [context, setContext] = useState([
        "1648440119398_Hello!",
        "1648440211596_Hi!",
        "1648443193203_Hola!",
        "1648443203671_Konnichiwa!",
        "1648443214329_Howdy! How do you do?"
    ])
    const [ancestor, setAncestor] = useState("")

    useEffect(() => {
        axios.get(`${baseAPIURL}atheneum/getAll`).then(re => {
            setAtheneum(re.data);
        })
        axios.get(`${baseAPIURL}yggdrasil/getAll`).then(re => {
            setYggdrasil(re.data);
            if (!premierSpeaker) setContext(Object.keys(re.data))
            else setContext(re.data[""])

            // let keys = Object.keys(re.data)

            // for (let i = 0; i < keys.length; i++) {
            //     async function addOne() {
            //         await axios.post(`${baseAPIURL}yggdrasil/addOne`, {label: keys[i], records: re.data[keys[i]]})
            //     }
            //     addOne()
            // }
        })
    }, [])

    const scrollDown = () => {
        let chatWindowEl = document.getElementById("chatWindow")
        if (chatWindowEl) chatWindowEl.scrollTo({top: chatWindowEl.scrollHeight, left: 0, behavior: 'smooth'})
    }

    useEffect(() => {
        if (chatHistory.length < 1 && Object.keys(yggdrasil).length > 0 && premierSpeaker) {
            replyMessage(0, yggdrasil, "Yggdrasil")
        }
    }, [yggdrasil])

    async function AddHomeWork(message) {
        await axios.post(`${baseAPIURL}research/addOne`, {researchTopic: message})
    }

    useEffect(() => {
        let matchIndex = -1;
        if (chatHistory.length > 0) {
            let userMsg = chatHistory.filter(msg => msg.parent === "user")
            if ((chatHistory.filter(msg => msg.parent === "user").length >= 3) && (DateTime.removeStamp(userMsg[userMsg.length - 1].fullContent) === DateTime.removeStamp(userMsg[userMsg.length - 2].fullContent) && DateTime.removeStamp(userMsg[userMsg.length - 2].fullContent) === DateTime.removeStamp(userMsg[userMsg.length - 3].fullContent))) {
                setTyping(true)
                setTimeout(() => replyMessage(0, Override, "Atheneum"), Math.min(2000, Math.floor(Math.random() * 5000)))
            }
            else {
                let parentContext = []
                if (ancestor) {
                    parentContext = Object.keys(yggdrasil);
                    matchIndex = DateTime.removeArrayStamp(parentContext).indexOf(DateTime.removeStamp(currentMessage.content))
                }
                else {
                    let parentMessage = chatHistory.filter(msg => msg.parent === "triton")
                    parentMessage = parentMessage[parentMessage.length - 1]
                    parentContext = yggdrasil[parentMessage.fullContent];
                    matchIndex = MatchService.GetMatch(parentContext, currentMessage)
                }
                
                if (context.length > 0 && parentContext.length > 0 && matchIndex >= 0) {
                    if (botState === "Online") {
                        let keys = Object.keys(yggdrasil)
                        setTyping(true)
                        setTimeout(() => replyMessage(keys.indexOf(parentContext[matchIndex]), yggdrasil, "Yggdrasil"), Math.min(2000, Math.floor(Math.random() * 5000)))
                    }
                }
                else {
                    matchIndex = MatchService.GetMatch(Object.keys(atheneum), currentMessage)
                    if (botState === "Online") {
                        let keys = Object.keys(atheneum)
                        setTyping(true)
                        setTimeout(() => replyMessage(keys.indexOf(keys[matchIndex]), atheneum, "Atheneum"), Math.min(2000, Math.floor(Math.random() * 5000)))
                        if (matchIndex < 0) AddHomeWork(currentMessage.fullContent)
                    }
                }
            }
        }
        window.navigator.onLine ? setBotState("Online") : setBotState("Offline");
    }, [currentMessage])

    async function learnStuff(subject, learningMaterial, childMessage) {
        let parentMessage = learningMaterial.filter(msg => msg.parent === subject)
        parentMessage = parentMessage[parentMessage.length - 1]
        let newMessage = childMessage.fullContent

        if (parentMessage) {
            parentMessage = parentMessage.fullContent;
            if (ancestor) parentMessage = ancestor;

            await axios.get(`${baseAPIURL}yggdrasil/getAll`).then(async re => {
                if (context.length > 0) {
                    if (DateTime.removeArrayStamp(context).includes(DateTime.removeStamp(newMessage))) {
                        setContext(re.data[context.filter((message) => DateTime.removeStamp(message) === DateTime.removeStamp(newMessage))[0]])
                        setAncestor("")
                        if (subject === "triton") setTimeout(() => setCurrentMessage(childMessage), 1000)
                    }
                    else {
                        if (re.data[parentMessage]) {
                            await axios.post(`${baseAPIURL}yggdrasil/updateOne`, {label: parentMessage, records: [...context, newMessage]}).then(async re => {
                                await axios.post(`${baseAPIURL}yggdrasil/addOne`, {label: newMessage, records: []}).then(async re => {
                                    await axios.get(`${baseAPIURL}yggdrasil/getAll`).then(async re => {
                                        setYggdrasil(re.data);
                                        setContext([])
                                        setAncestor("")
                                        if (subject === "triton") setTimeout(() => setCurrentMessage(childMessage), 1000)
                                    })
                                })
                            })
                        }
                        else {
                            await axios.post(`${baseAPIURL}yggdrasil/updateOne`, {label: parentMessage, records: [...context, newMessage]}).then(async re => {
                                await axios.post(`${baseAPIURL}yggdrasil/addOne`, {label: newMessage, records: []}).then(async re => {
                                    await axios.get(`${baseAPIURL}yggdrasil/getAll`).then(async re => {
                                        setYggdrasil(re.data);
                                        setContext([])
                                        setAncestor("")
                                        if (subject === "triton") setTimeout(() => setCurrentMessage(childMessage), 1000)
                                    })
                                })
                            })
                        }
                    }
                }
                else {
                    await axios.post(`${baseAPIURL}yggdrasil/updateOne`, {label: parentMessage, records: [...context, newMessage]}).then(async re => {
                        await axios.post(`${baseAPIURL}yggdrasil/addOne`, {label: newMessage, records: []}).then(async re => {
                            await axios.get(`${baseAPIURL}yggdrasil/getAll`).then(async re => {
                                setYggdrasil(re.data);
                                setContext([])
                                setAncestor("")
                                if (subject === "triton") setTimeout(() => setCurrentMessage(childMessage), 1000)
                            })
                        })
                    })

                }
            })
        }
        else {
            if (subject === "triton") {
                await axios.get(`${baseAPIURL}yggdrasil/getAll`).then(async re => {
                    let keys = Object.keys(re.data)
                    if (DateTime.removeArrayStamp(keys).includes(DateTime.removeStamp(newMessage))) {
                        setContext(re.data[keys.filter((message) => DateTime.removeStamp(message) === DateTime.removeStamp(newMessage))[0]])
                        setAncestor(keys.filter((message) => DateTime.removeStamp(message) === DateTime.removeStamp(newMessage))[0])
                        setTimeout(() => setCurrentMessage(childMessage), 1000)
                    }
                    else {
                        await axios.post(`${baseAPIURL}yggdrasil/updateOne`, {label: "", records: [...re.data[""], newMessage]}).then(async re => {
                            await axios.post(`${baseAPIURL}yggdrasil/addOne`, {label: newMessage, records: []}).then(async re => {
                                await axios.get(`${baseAPIURL}yggdrasil/getAll`).then(async re => {
                                    setYggdrasil(re.data);
                                    setContext([])
                                    setAncestor(newMessage)
                                    setTimeout(() => setCurrentMessage(childMessage), 1000)
                                })
                            })
                        })
                    }
                })
            }
            else {
                let keys = Object.keys(yggdrasil)
                setContext(yggdrasil[keys.filter((message) => DateTime.removeStamp(message) === DateTime.removeStamp(newMessage))[0]])
                setAncestor(keys.filter((message) => message === newMessage)[0])
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (/^[a-zA-Z]/.test(newMsg) && !typing) {
            let d = new Date()
            let msg = newMsg.charAt(0).toUpperCase() + newMsg.slice(1);
            const newMessage = {
                parent: "user",
                content: DateTime.addStamp(msg.trim()),
                fullContent: DateTime.addStamp(msg.trim()),
                time: d
            }

            setChatHistory(chatHistory.concat(newMessage))
            learnStuff("triton", chatHistory.concat(newMessage), newMessage)
            setNewMsg("")
            scrollDown()
        }
    }

    function fallbackMessage(store) {
        let ignorance = Override.fallback[Math.floor(Math.random() * Override.fallback.length)]
        const ignoranceList = ignorance.split("+")
        let fallbackMessages = []
        for (let i = 0; i < ignoranceList.length; i++) {
            const newXalenMessage = {
                parent: "triton",
                content: DateTime.addStamp(ignoranceList[i].trim()),
                fullContent: DateTime.addStamp(ignorance),
                time: d
            }
            fallbackMessages.push(newXalenMessage)
            scrollDown()
        }

        setContext(yggdrasil[fallbackMessages[fallbackMessages.length - 1].fullContent])
        setChatHistory(chatHistory.concat(fallbackMessages))
        learnStuff("user", chatHistory.concat(fallbackMessages), fallbackMessages[fallbackMessages.length - 1])

        setTyping(false)
    }

    function replyMessage(index, responseStore, storeID) {
        if (index >= 0) {
            let keys = Object.keys(responseStore)
            if (keys.length > 0) {
                let d = new Date()
                let reply = responseStore[keys[index]]
                if (reply.length > 0) {
                    if (reply.length > 1) reply = reply.filter((message) => !Override.fallback.includes(message))
                    reply = reply[Math.floor(Math.random() * reply.length)]
                    let replyMessages = reply.split("+")
                    let replyList = []
                    for (let i = 0; i < replyMessages.length; i++) {
                        const newXalenMessage = {
                            parent: "triton",
                            content: DateTime.addStamp(replyMessages[i].trim()),
                            fullContent: DateTime.addStamp(reply),
                            time: d
                        }
                        replyList.push(newXalenMessage)
                        scrollDown()
                    }
                    setChatHistory(chatHistory.concat(replyList))
                    learnStuff("user", chatHistory.concat(replyList), replyList[replyList.length - 1])
                    setTyping(false)
                }
                else fallbackMessage(storeID)
            }
        }
        else fallbackMessage(storeID)
    }

    return(
        <div className="chatWindow" id="chatWindow">
            <h3 className="dateTimeDisplay" style={{color: theme === "Light" ? "#121212" : "white"}}>{DateTime.getDateFormatOne()}</h3>
            {
                chatHistory.map((message) =>
                    <div className="chatMessage">
                        <h3 className="chatContent" style={{float: message.parent === "triton" ? "left" : "right", backgroundColor: message.parent === "user" ? "var(--white)" : "var(--blue)", color: message.parent === "user" ? "var(--blue)" : "var(--white)"}}>
                            {DateTime.removeStamp(message.content)}
                        </h3>
                        <h4 className="chatMessageTime" style={{
                            textAlign: message.parent === "triton" ? "left" : "right",
                            float: message.parent === "triton" ? "left" : "right",
                            transform: message.parent === "triton" ? "translate(15px, 0px)" : "translate(-15px, 0px)"}}
                        >{DateTime.formatTime(message.time)}</h4>
                    </div>
                )
            }
            {
                typing ?
                <div className="chatMessage">
                    <h3 className="chatContentTyping" style={{float: "left"}}>...</h3>
                </div> : null
            }
            <div className="chatInputDock">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="chatInputDockField" value={newMsg} onChange={(el) => setNewMsg(el.target.value)} 
                        style={{backgroundColor: theme === "Light" ? "white" : "#121212", color: theme === "Light" ? "#121212" : "white"}}
                        placeholder="Type your message here..." />
                    <button className="chatInputDockSubmit"><img src={sendIcon} alt="Send" /></button>
                </form>
            </div>
        </div>
    )
}

export default ChatWindow;