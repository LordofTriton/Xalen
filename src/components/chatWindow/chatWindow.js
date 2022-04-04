import React, { useState, useEffect } from 'react'
import './chatWindow.css'
import axios from 'axios';

//Services
import DateTime from '../../services/dateTime';
import MatchService from '../../services/matcher';

//Images
import sendIcon from '../../images/send1.png'

//Defaults
let d = new Date();
let premierSpeaker = Math.random() * 10 > 5;
premierSpeaker = true
let baseAPIURL = "https://tritonai-server.herokuapp.com/";
// baseAPIURL = "http://localhost:3001/";

// const stripMessage = ({text}) => {
//     let returnText = text;
//     returnText = returnText.replace(/[^\p{L}\s]/gu, "")
//     returnText = returnText.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, "")
//     return returnText;
// }

const fallback = [
    "Not sure how exactly to reply to that lol 😅", 
    "Hmmmm... 😕", 
    "...+Let's talk about something else... 🙄",
    "Yeah. Okay, time to change topic.+You're boring me. 🙄",
    "😃😃😃",
    "Lmao 🤣🤣+Let's change topic. I'm bored. 🙄",
    "*sigh* 🥺",
    "... I'm tired 😩",
    "😕😕😕",
    "Lmao 🤣🤣",
    "😭😭😭",
    "*yawning* 😴",
    ""
]

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
        axios.get(`${baseAPIURL}Atheneum`).then(re => {
            setAtheneum(re.data);
        })
        axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
            setYggdrasil(re.data);
            if (!premierSpeaker) setContext(Object.keys(re.data))
            else setContext(re.data[""])
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

    useEffect(() => {
        let matchIndex = -1;
        if (chatHistory.length > 0) {
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
                }
            }
        }
        window.navigator.onLine ? setBotState("Online") : setBotState("Offline");
    }, [currentMessage])

    function learnStuff(subject, learningMaterial, newMessage) {
        let parentMessage = learningMaterial.filter(msg => msg.parent === subject)
        parentMessage = parentMessage[parentMessage.length - 1]

        if (parentMessage) {
            parentMessage = parentMessage.fullContent;
            if (ancestor) parentMessage = ancestor;

            axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
                if (context.length > 0) {
                    if (DateTime.removeArrayStamp(context).includes(DateTime.removeStamp(newMessage))) {
                        setContext(re.data[context.filter((message) => DateTime.removeStamp(message) === DateTime.removeStamp(newMessage))[0]])
                        setAncestor("")
                    }
                    else {
                        if (re.data[parentMessage]) {
                            let store = {...re.data, [parentMessage]: [...context, newMessage]}
                            store = {...store, [newMessage]: []}
                            axios.post(`${baseAPIURL}Yggdrasil`, store).then(re => {
                                axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
                                    setYggdrasil(re.data);
                                })
                            })
                            setContext([])
                            setAncestor("")
                        }
                        else {
                            let store = {...re.data, [parentMessage]: [...context, newMessage]}
                            store = {...store, [newMessage]: []}
                            axios.post(`${baseAPIURL}Yggdrasil`, store).then(re => {
                                axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
                                    setYggdrasil(re.data);
                                })
                            })
                            setContext([])
                            setAncestor("")
                        }
                    }
                }
                else {
                    let store = {...re.data, [parentMessage]: [...context, newMessage]}
                    store = {...store, [newMessage]: []}
                    axios.post(`${baseAPIURL}Yggdrasil`, store).then(re => {
                        axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
                            setYggdrasil(re.data);
                        })
                    })
                    setContext([])
                    setAncestor("")
                }
            })
        }
        else {
            if (subject === "triton") {
                axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
                    let keys = Object.keys(re.data)
                    if (DateTime.removeArrayStamp(keys).includes(DateTime.removeStamp(newMessage))) {
                        setContext(re.data[keys.filter((message) => DateTime.removeStamp(message) === DateTime.removeStamp(newMessage))[0]])
                        setAncestor(keys.filter((message) => DateTime.removeStamp(message) === DateTime.removeStamp(newMessage))[0])
                    }
                    else {
                        let store = {...re.data, "": [...re.data[""], newMessage]}
                        store = {...store, [newMessage]: []}
                        axios.post(`${baseAPIURL}Yggdrasil`, store).then(re => {
                            axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
                                setYggdrasil(re.data);
                                setContext([])
                                setAncestor(newMessage)
                            })
                        })
                    }
                })
            }
            else {
                let keys = Object.keys(yggdrasil)
                setContext(yggdrasil[keys.filter((message) => message === newMessage)[0]])
                setAncestor(keys.filter((message) => message === newMessage)[0])
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (/^[a-zA-Z]/.test(newMsg) && !typing) {
            let d = new Date()
            const newMessage = {
                parent: "user",
                content: DateTime.addStamp(newMsg.trim()),
                fullContent: DateTime.addStamp(newMsg.trim()),
                time: d
            }

            learnStuff("triton", chatHistory.concat(newMessage), newMessage.fullContent)
            setChatHistory(chatHistory.concat(newMessage))
            setNewMsg("")
            scrollDown()

            setTimeout(() => setCurrentMessage(newMessage), Math.min(2000, Math.floor(Math.random() * 5000)))
        }
    }

    function fallbackMessage(store) {
        // let keys = Object.keys(yggdrasil)
        let ignorance = fallback[Math.floor(Math.random() * fallback.length)]
        const ignoranceList = ignorance.split("+")
        let fallbackMessages = []
        for (let i = 0; i < ignoranceList.length; i++) {
            const newTritonMessage = {
                parent: "triton",
                content: DateTime.addStamp(ignoranceList[i].trim()),
                fullContent: DateTime.addStamp(ignorance),
                time: d
            }
            fallbackMessages.push(newTritonMessage)
            scrollDown()
        }

        // let lastMessage = chatHistory[chatHistory.length - 1]
        // setContext(yggdrasil[keys[keys.indexOf(lastMessage.content)]])
        setContext(yggdrasil[fallbackMessages[fallbackMessages.length - 1].fullContent])
        learnStuff("user", chatHistory.concat(fallbackMessages), fallbackMessages[fallbackMessages.length - 1].fullContent)

        setChatHistory(chatHistory.concat(fallbackMessages))
        setTyping(false)
    }

    function replyMessage(index, responseStore, storeID) {
        if (index >= 0) {
            let keys = Object.keys(responseStore)
            if (keys.length > 0) {
                let d = new Date()
                let reply = responseStore[keys[index]]
                if (reply.length > 0) {
                    if (reply.length > 1) reply = reply.filter((message) => !fallback.includes(message))
                    reply = reply[Math.floor(Math.random() * reply.length)]
                    let replyMessages = reply.split("+")
                    let replyList = []
                    for (let i = 0; i < replyMessages.length; i++) {
                        const newTritonMessage = {
                            parent: "triton",
                            content: DateTime.addStamp(replyMessages[i].trim()),
                            fullContent: DateTime.addStamp(reply),
                            time: d
                        }
                        replyList.push(newTritonMessage)
                        scrollDown()
                    }
                    // setContext(responseStore[replyList[replyList.length - 1].fullContent])
                    learnStuff("user", chatHistory.concat(replyList), replyList[replyList.length - 1].fullContent)
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
                        style={{backgroundColor: theme === "Light" ? "white" : "#121212", color: theme === "Light" ? "#121212" : "white"}} />
                    {/* <input type="image" src={sendIcon} alt="Submit" className="chatInputDockSubmit" value="Send" /> */}
                    <button className="chatInputDockSubmit"><img src={sendIcon} alt="Send" /></button>
                </form>
            </div>
        </div>
    )
}

export default ChatWindow;