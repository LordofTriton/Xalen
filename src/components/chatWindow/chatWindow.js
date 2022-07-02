import React, { useState, useEffect } from 'react'
import './chatWindow.css'
import axios from 'axios';

//Services
import DateTime from '../../services/dateTime';
import Fallbacks from '../../services/defaults';
import Censor from '../../services/censor';
import Emoji from '../../services/emoji';

//Images
import sendIcon from '../../images/send1.png';
import emojiIcon from '../../images/emoji.png';

//Defaults
let d = new Date();
let premierSpeaker = Math.random() * 10 > 3;
// premierSpeaker = true;
let baseAPIURL = "https://tritonserver.herokuapp.com/xalen/";
// baseAPIURL = "http://localhost:5000/";

const ChatWindow = ({CortexControl}) => {
    const [chatHistory, setChatHistory] = useState([])
    const [typing, setTyping] = useState(false)
    const [newMsg, setNewMsg] = useState("")
    const [currentMessage, setCurrentMessage] = useState({
        parent: "",
        content: "",
        fullContent: "",
        time: d
    })
    const [context, setContext] = useState([])
    const [ancestor, setAncestor] = useState("")
    const [parent, setParent] = useState("")
    const [xalenTurn, setXalenTurn] = useState(false)
    const [emojiBox, setEmojiBox] = useState(false)
    const [myTurn, setMyTurn] = useState(false)

    let botState = CortexControl.botState;
    let setBotState = CortexControl.setBotState;
    let theme = CortexControl.theme;
    let censor = CortexControl.censor;

    const scrollDown = () => {
        let chatWindowEl = document.getElementById("chatWindow")
        if (chatWindowEl) chatWindowEl.scrollTo({top: chatWindowEl.scrollHeight, left: 0, behavior: 'smooth'})
    }

    useEffect(() => {
        axios.post(`${baseAPIURL}yggdrasil/start`).then(re => {
            if (chatHistory.length < 1 && premierSpeaker) {
                let data = re.data;
                setXalenTurn(true)
                replyMessage(re.data, Math.floor(Math.random() * data.length))
            }
            setContext(re.data)
        })
    }, [])

    useEffect(() => {
        if (chatHistory.length > 0) {
            window.navigator.onLine ? setBotState("Online") : setBotState("Offline");

            let messageData = {
                chatHistory: chatHistory,
                ancestor: ancestor,
                context: context,
                botState: botState,
                parent: parent
            }

            axios.post(`${baseAPIURL}getReply/`, messageData).then(re => {
                setTyping(true)

                let data = re.data.replies;
                let typingDelay = 2000
                let replyIndex = 0;
                if (data.length > 0) {
                    replyIndex = Math.floor(Math.random() * data.length);
                    typingDelay = 100 * data[replyIndex].length;
                }
                setTimeout(() => replyMessage(data, replyIndex), typingDelay)
            })
        }

    }, [currentMessage])

    async function learnStuff(subject, learningMaterial, childMessage) {
        setXalenTurn(true)
        
        let parentMessage = learningMaterial.filter(msg => msg.parent === subject)
        parentMessage = parentMessage[parentMessage.length - 1]
        let newMessage = childMessage.fullContent

        let learnData = {
            parentMessage: parentMessage,
            ancestor: ancestor,
            newMessage: newMessage,
            context: context,
            subject: subject
        }

        await axios.post(`${baseAPIURL}learn/`, learnData).then(re => {
            setContext(re.data.newContext);
            setAncestor(re.data.newAncestor);
            setParent(re.data.newParent);
            if (subject === "xalen") setTimeout(() => setCurrentMessage(childMessage), 1000)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setEmojiBox(false)
        if (!xalenTurn) {
            if (newMsg.trim().length > 0) {
                let d = new Date()
                let msg = newMsg.charAt(0).toUpperCase() + newMsg.slice(1);
                msg = msg.replaceAll("_", " ")
                const newMessage = {
                    parent: "user",
                    content: DateTime.addStamp(msg.trim()),
                    fullContent: DateTime.addStamp(msg.trim()),
                    time: d
                }

                setChatHistory(chatHistory.concat(newMessage))
                learnStuff("xalen", chatHistory.concat(newMessage), newMessage)
                setNewMsg("")
                scrollDown()
            }
            else {
                CortexControl.setAlert({
                    title: ["Excuse me?", "Nope.", "Hmmmmm."][Math.floor(Math.random() * 3)],
                    content: ["You might wanna type something before sending. 😒", "You can't send empty messages 😕", "How about typing something first? 🤔"][Math.floor(Math.random() * 3)],
                    button: "Got it."
                })
            }
        }
        else {
            CortexControl.setAlert({
                title: ["Really?", "Seriously?", "Kidding me?"][Math.floor(Math.random() * 3)],
                content: ["Don't type while I'm replying 😒", "At least lemme reply first? 😕", "Won't you let me reply before sending another message? 🤔"][Math.floor(Math.random() * 3)],
                button: "Got it."
            })
        }
    }

    function fallbackMessage() {
        axios.post(`${baseAPIURL}research/addOne`, {researchTopic: currentMessage.fullContent})

        let ignorance = Fallbacks[Math.floor(Math.random() * Fallbacks.length)]
        const ignoranceList = ignorance.split("+")
        let fallbackMessages = []
        for (let i = 0; i < ignoranceList.length; i++) {
            const newXalenMessage = {
                parent: "xalen",
                content: DateTime.addStamp(ignoranceList[i].trim()),
                fullContent: DateTime.addStamp(ignorance),
                time: d
            }
            fallbackMessages.push(newXalenMessage)
            scrollDown()
        }
        
        setChatHistory(chatHistory.concat(fallbackMessages))
        learnStuff("user", chatHistory.concat(fallbackMessages), fallbackMessages[fallbackMessages.length - 1])

        setTyping(false)
        setXalenTurn(false)
    }

    function replyMessage(reply, replyIndex) {
        if (reply.length > 0) {
            reply = reply[replyIndex]
            let replyMessages = reply.split("+")
            let replyList = []
            for (let i = 0; i < replyMessages.length; i++) {
                const newXalenMessage = {
                    parent: "xalen",
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
            setXalenTurn(false)
        }
        else fallbackMessage()
    }

    return(
        <>
            <div className="chatWindow" id="chatWindow">
                <h3 className="dateTimeDisplay" style={{color: "white", backgroundColor: "rgba(0,0,0,0.3)"}}>{DateTime.getDateFormatOne()}</h3>
                {
                    chatHistory.map((message) =>
                        <div className="chatMessage">
                            <h3 className="chatContent" style={{float: message.parent === "xalen" ? "left" : "right", backgroundImage: message.parent === "user" ? "none" : null, color: message.parent === "user" ? "var(--blue)" : "var(--white)"}}>
                                {Censor.CensorText(DateTime.removeStamp(message.content), censor)}
                            </h3>
                            <h4 className="chatMessageTime" style={{
                                textAlign: message.parent === "xalen" ? "left" : "right",
                                float: message.parent === "xalen" ? "left" : "right",
                                transform: message.parent === "xalen" ? "translate(15px, 0px)" : "translate(-15px, 0px)"}}
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
                        <img className="emojiButton" src={emojiIcon} onClick={() => setEmojiBox(true)} alt="emoji" />
                        <input type="text" className="chatInputDockField" value={newMsg} onChange={(el) => setNewMsg(el.target.value)} 
                            style={{backgroundColor: theme === "Light" ? "white" : "#121212", color: theme === "Light" ? "#121212" : "white"}}
                            placeholder="Type your message here..." onClick={() => setEmojiBox(false)} />
                        <button className="chatInputDockSubmit"><img src={sendIcon} alt="Send" /></button>
                    </form>
                </div>
            </div>
            <div className="chatEmojiBox" style={{bottom: emojiBox ? "90px" : "-100vh"}}>
                <div className="chatEmojiTray">
                {
                    Emoji.map((emoji) =>
                        <h3 className="chatEmoji" onClick={() => setNewMsg(newMsg.concat(emoji))}>{emoji}</h3>
                    )
                }
                </div>
            </div>
        </>
    )
}

export default ChatWindow;
