import React, { useState, useEffect } from 'react'
import './chatWindow.css'
import axios from 'axios';

//Services
import DateTime from '../../services/dateTime';

//Defaults
const stringSimilarity = require("string-similarity");
const baseAPIURL = "https://zeus-chat-server.herokuapp.com/responseStore";
let d = new Date()
const defaultMessage = {
    parent: "zeus",
    content: ["Hello!", "Hi.", "Hello! How are you?", `Good ${DateTime.dayPeriod()}.`][Math.floor(Math.random() * 4)],
    time: d
}
// const stripMessage = ({text}) => {
//     let returnText = text;
//     returnText = returnText.replace(/[^\p{L}\s]/gu, "")
//     returnText = returnText.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, "")
//     return returnText;
// }

const ChatWindow = () => {
    const [chatHistory, setChatHistory] = useState([defaultMessage])
    const [typing, setTyping] = useState(false)
    const [newMsg, setNewMsg] = useState("")
    const [currentMessage, setCurrentMessage] = useState({
        parent: "",
        content: "",
        time: d
    })
    const [responseStore, setResponseStore] = useState({})

    if (Object.keys(responseStore).length < 1) {
        axios.get(baseAPIURL).then(re => {
            setResponseStore(re.data)
        })
    }

    const scrollDown = () => {
        let chatWindowEl = document.getElementById("chatWindow")
        if (chatWindowEl) chatWindowEl.scrollTo({top: chatWindowEl.scrollHeight, left: 0, behavior: 'smooth'})
    }

    useEffect(() => {
        let keys = Object.keys(responseStore)
        if (keys.length > 0) {
            let index = -1
            let match = 0.3
            for (let i = 0; i < keys.length; i++) {
                let difference = stringSimilarity.compareTwoStrings(currentMessage.content, keys[i])
                if (difference > match) {
                    index = i;
                    match = difference;
                }
            }
            setTyping(true)
            setTimeout(() => replyMessage(index), Math.min(2000, Math.floor(Math.random() * 5000)))
        }
    }, [currentMessage])

    function learnStuff(learningMaterial, lastUserMsg) {
        let lastZeusMsg = learningMaterial.filter(msg => msg.parent === "zeus")
        lastZeusMsg = lastZeusMsg[lastZeusMsg.length - 1]

        if (lastZeusMsg) {
            lastZeusMsg = lastZeusMsg.content;

            let keys = Object.keys(responseStore)
            if (!keys.includes(lastZeusMsg)) {
                axios.get(baseAPIURL).then(re => {
                    let store = {...re.data, [lastZeusMsg]: [lastUserMsg]}
                    axios.post(baseAPIURL, store).then(re => {
                        axios.get(baseAPIURL).then(re => {
                            setResponseStore(re.data)
                        })
                    })
                })
            }
            else {
                axios.get(baseAPIURL).then(re => {
                    let store = {...re.data, [lastZeusMsg]: [...responseStore[lastZeusMsg], lastUserMsg]}
                    axios.post(baseAPIURL, store).then(re => {
                        axios.get(baseAPIURL).then(re => {
                            setResponseStore(re.data)
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
                content: newMsg.trim(),
                time: d
            }
            learnStuff(chatHistory.concat(newMessage), newMsg.trim())
            setChatHistory(chatHistory.concat(newMessage))
            setNewMsg("")
            scrollDown()

            setTimeout(() => setCurrentMessage(newMessage), 1000)
        }
    }

    function replyMessage(index) {
        if (index >= 0) {
            let keys = Object.keys(responseStore)
            if (keys.length > 0) {
                let d = new Date()
                let reply = responseStore[keys[index]]
                reply = reply[Math.floor(Math.random() * reply.length)].split("+")
                let replyList = []
                for (let i = 0; i < reply.length; i++) {
                    const newZeusMessage = {
                        parent: "zeus",
                        content: reply[i].trim(),
                        time: d
                    }
                    replyList.push(newZeusMessage)
                    scrollDown()
                }
                setChatHistory(chatHistory.concat(replyList))
                setTyping(false)
            }
        }
        else {
            let ignorance = [
                "...+I've forgotten what I wanted to say...", 
                "Not sure how exactly to reply to that lol", 
                "Hmmmm...", 
                "I..+I totally forgot what I was about to say lol"
            ][Math.floor(Math.random() * 4)]
            ignorance = ignorance.split("+")
            let ignoranceList = []
            for (let i = 0; i < ignorance.length; i++) {
                const newZeusMessage = {
                    parent: "zeus",
                    content: ignorance[i].trim(),
                    time: d
                }
                ignoranceList.push(newZeusMessage)
                scrollDown()
            }
            setChatHistory(chatHistory.concat(ignoranceList))
            setTyping(false)
        }
    }

    return(
        <div className="chatWindow" id="chatWindow">
            <h3 className="dateTimeDisplay">{DateTime.getDateFormatOne()}</h3>
            {
                chatHistory.map((message) =>
                    <div className="chatMessage">
                        <h3 className="chatContent" style={{float: message.parent === "zeus" ? "left" : "right", backgroundColor: message.parent === "user" ? "var(--white" : "var(--orange-peel)", color: message.parent === "user" ? "var(--orange-peel)" : "var(--white)"}}>
                            {message.content}
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
                    <input type="text" className="chatInputDockField" value={newMsg} onChange={(el) => setNewMsg(el.target.value)} />
                    <input type="submit" className="chatInputDockSubmit" value="Send" />
                </form>
            </div>
        </div>
    )
}

export default ChatWindow;