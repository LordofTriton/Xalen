import React, { useState, useEffect } from 'react'
import './chatWindow.css'
import axios from 'axios';

//Services
import DateTime from '../../services/dateTime';

var stringSimilarity = require("string-similarity");

const defaultMessage = {
    parent: "zeus",
    content: ["Hello!", "Hi.", "Hello! How are you?", `Good ${DateTime.dayPeriod()}.`][Math.floor(Math.random() * 4)]
}

const ChatWindow = () => {
    const [chatHistory, setChatHistory] = useState([defaultMessage])
    const [typing, setTyping] = useState(false)
    const [newMsg, setNewMsg] = useState("")
    const [currentMessage, setCurrentMessage] = useState("")
    const [responseStore, setResponseStore] = useState({})

    if (Object.keys(responseStore).length < 1) {
        axios.get("https://lordoftriton.github.io/data/ZeusDB.json").then(re => {
            setResponseStore(re.data.responseStore)
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
                let difference = stringSimilarity.compareTwoStrings(currentMessage, keys[i])
                if (difference > match) {
                    index = i;
                    match = difference;
                }
            }
            setTyping(true)
            setTimeout(() => replyMessage(index), Math.min(2000, Math.floor(Math.random() * 5000)))
        }
    }, [currentMessage])

    // function learnStuff(learningMaterial, lastUserMsg) {
    //     let lastZeusMsg = learningMaterial.filter(msg => msg.parent === "zeus")
    //     lastZeusMsg = lastZeusMsg[lastZeusMsg.length - 1]
    //     if (lastZeusMsg) {
    //         lastZeusMsg = lastZeusMsg.content

    //         let keys = Object.keys(responseStore)
    //         if (!keys.includes(lastZeusMsg)) {
    //             let store = {...responseStore, [lastZeusMsg]: [lastUserMsg]}
    //             axios.post("https://api.npoint.io/5182d190d46f50417195/responseStore", store).then(re => {
    //                 axios.get("http://api.npoint.io/5182d190d46f50417195/responseStore").then(re => {
    //                     setResponseStore(re.data)
    //                 })
    //             })
    //         }
    //         else {
    //             let store = {...responseStore, [lastZeusMsg]: [...responseStore[lastZeusMsg], lastUserMsg]}
    //             axios.post("http://api.npoint.io/5182d190d46f50417195/responseStore", store).then(re => {
    //                 axios.get("http://api.npoint.io/5182d190d46f50417195/responseStore").then(re => {
    //                     setResponseStore(re.data)
    //                 })
    //             })
    //         }
    //     }
    // }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (/^[a-zA-Z]/.test(newMsg)) {
            const newMessage = {
                parent: "user",
                content: newMsg
            }
            // learnStuff(chatHistory.concat(newMessage), newMsg)
            setChatHistory(chatHistory.concat(newMessage))
            setNewMsg("")
            scrollDown()

            setTimeout(() => setCurrentMessage(newMessage.content), 1000)
        }
    }

    function replyMessage(index) {
        if (index >= 0) {
            let keys = Object.keys(responseStore)
            if (keys.length > 0) {
                let reply = responseStore[keys[index]]
                reply = reply[Math.floor(Math.random() * reply.length)].split("+")
                let replyList = []
                for (let i = 0; i < reply.length; i++) {
                    const newZeusMessage = {
                        parent: "zeus",
                        content: reply[i]
                    }
                    replyList.push(newZeusMessage)
                    scrollDown()
                }
                setChatHistory(chatHistory.concat(replyList))
                setTyping(false)
            }
        }
        else {
            const newZeusMessage = {
                parent: "zeus",
                content: "I dunno how to reply to that... :("
            }
            scrollDown()
            setChatHistory(chatHistory.concat(newZeusMessage))
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