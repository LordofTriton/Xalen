import React, { useState, useEffect } from 'react'
import './chatWindow.css'
import axios from 'axios';

//Services
import DateTime from '../../services/dateTime';
import MatchService from '../../services/matcher';

//Defaults
let d = new Date()

// const baseAPIURL = "https://zeuschat-server.herokuapp.com/";
const baseAPIURL = "http://localhost:3001/";

// const defaultMessage = [0, 8, 2, DateTime.dayPeriod() === "evening" ? 24 : DateTime.dayPeriod() === "morning" ? 16 : 20][Math.floor(Math.random() * 4)]

// const stripMessage = ({text}) => {
//     let returnText = text;
//     returnText = returnText.replace(/[^\p{L}\s]/gu, "")
//     returnText = returnText.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, "")
//     return returnText;
// }

function spreadResponse(array) {
    if (array) return array;
    else return []
}

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

    useEffect(() => {
        axios.get(`${baseAPIURL}Atheneum`).then(re => {
            setAtheneum(re.data);
        })
        axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
            setYggdrasil(re.data);
        })
    }, [])

    // if (Object.keys(atheneum).length < 1) {
    //     setAtheneum(APIService.getAtheneum())
    // }
    // if (Object.keys(yggdrasil).length < 1) {
    //     setYggdrasil(APIService.getYggdrasil())
    // }

    const scrollDown = () => {
        let chatWindowEl = document.getElementById("chatWindow")
        if (chatWindowEl) chatWindowEl.scrollTo({top: chatWindowEl.scrollHeight, left: 0, behavior: 'smooth'})
    }

    useEffect(() => {
        if (chatHistory.length < 1 && Object.keys(yggdrasil).length > 0) {
            replyMessage(0, yggdrasil, "Yggdrasil")
        }
    }, [yggdrasil])

    useEffect(() => {
        let matchIndex = -1;
        matchIndex = MatchService.GetMatch(context, currentMessage)
        if (chatHistory.length > 0) {
            if (context.length > 0 && matchIndex >= 0) {
                // if (botState === "Online") {
                if (true) {
                    let keys = Object.keys(yggdrasil)
                    setTyping(true)
                    setTimeout(() => replyMessage(keys.indexOf(context[matchIndex]), yggdrasil, "Yggdrasil"), Math.min(2000, Math.floor(Math.random() * 5000)))
                }
            }
            else {
                matchIndex = MatchService.GetMatch(Object.keys(atheneum), currentMessage)
                // if (botState === "Online") {
                if (true) {
                    let keys = Object.keys(atheneum)
                    setTyping(true)
                    setTimeout(() => replyMessage(keys.indexOf(keys[matchIndex]), atheneum, "Atheneum"), Math.min(2000, Math.floor(Math.random() * 5000)))
                }
            }
        }
        window.navigator.onLine ? setBotState("Online") : setBotState("Offline");
    }, [currentMessage])

    function learnStuff(subject, learningMaterial, newMessage) {
        let parentMessage = learningMaterial.filter(msg => msg.parent === subject)
        parentMessage = parentMessage[parentMessage.length - 1]

        if (parentMessage) {
            parentMessage = parentMessage.content;

            if (MatchService.GetArrayMatch(context, newMessage) < 0) {
                axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
                    console.log("Parent Message:", parentMessage)
                    console.log("Yggdrasil:", re.data[parentMessage])
                    let store = {...re.data, [parentMessage]: [...re.data[parentMessage], newMessage]}
                    store = {...store, [newMessage]: []}
                    axios.post(`${baseAPIURL}Yggdrasil`, store).then(re => {
                        axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
                            setYggdrasil(re.data);
                        })
                    })
                })
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (/^[a-zA-Z]/.test(newMsg)) {
            let d = new Date()
            const newMessage = {
                parent: "user",
                content: DateTime.addStamp(newMsg.trim()),
                time: d
            }
            learnStuff("zeus", chatHistory.concat(newMessage), newMessage.content)
            setChatHistory(chatHistory.concat(newMessage))
            setNewMsg("")
            scrollDown()

            setTimeout(() => setCurrentMessage(newMessage), 1000)
        }
    }

    function fallbackMessage(store) {
        let keys = Object.keys(yggdrasil)
        let ignorance = [
            "...+I've forgotten what I wanted to say... 😩", 
            "Not sure how exactly to reply to that lol 😅", 
            "Hmmmm... 😕", 
            "...+Let's talk about something else... 🙄",
            "Yeah. Okay, time to change topic.+You're boring me. 🙄",
            "Okay, can we please talk about something else? 😃",
            "Lmao 🤣🤣+Let's change topic. I'm bored. 🙄",
            "*sigh*+🥺",
            "...+I'm tired 😩",
            "😕😕😕",
            "Lmao 🤣🤣"
        ][Math.floor(Math.random() * 11)]
        const ignoranceList = ignorance.split("+")
        let fallbackMessages = []
        for (let i = 0; i < ignoranceList.length; i++) {
            const newZeusMessage = {
                parent: "zeus",
                content: DateTime.addStamp(ignoranceList[i].trim()),
                time: d
            }
            fallbackMessages.push(newZeusMessage)
            scrollDown()
        }

        let lastMessage = chatHistory[chatHistory.length - 1]
        setContext(yggdrasil[keys[keys.indexOf(lastMessage.content)]])
        learnStuff("user", chatHistory.concat(fallbackMessages), fallbackMessages[fallbackMessages.length - 1].content)

        setChatHistory(chatHistory.concat(fallbackMessages))
        setTyping(false)
    }

    function replyMessage(index, responseStore, storeID) {
        if (index >= 0) {
            let keys = Object.keys(responseStore)
            if (keys.length > 0) {
                let d = new Date()
                setContext(responseStore[keys[index]])
                let reply = responseStore[keys[index]]
                if (reply.length > 0) {
                    reply = reply[Math.floor(Math.random() * reply.length)]
                    let replyMessages = reply.split("+")
                    let replyList = []
                    for (let i = 0; i < replyMessages.length; i++) {
                        const newZeusMessage = {
                            parent: "zeus",
                            content: DateTime.addStamp(replyMessages[i].trim()),
                            time: d
                        }
                        replyList.push(newZeusMessage)
                        scrollDown()
                    }
                    if (storeID === "Atheneum") {
                        alert("Looked it up!")
                        learnStuff("user", chatHistory.concat(replyList), replyList[replyList.length - 1].content)
                    }
                    setChatHistory(chatHistory.concat(replyList))
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
                        <h3 className="chatContent" style={{float: message.parent === "zeus" ? "left" : "right", backgroundColor: message.parent === "user" ? "var(--white" : "var(--medium)", color: message.parent === "user" ? "var(--medium)" : "var(--white)"}}>
                            {DateTime.removeStamp(message.content)}
                        </h3>
                        <h4 className="chatMessageTime" style={{
                            textAlign: message.parent === "zeus" ? "left" : "right",
                            float: message.parent === "zeus" ? "left" : "right",
                            transform: message.parent === "zeus" ? "translate(15px, 0px)" : "translate(-15px, 0px)"}}
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
                        style={{backgroundColor: theme === "Light" ? "white" : "#121212", color: theme === "Light" ? "#121212" : "white"}} />
                    <input type="submit" className="chatInputDockSubmit" value="Send" />
                </form>
            </div>
        </div>
    )
}

export default ChatWindow;