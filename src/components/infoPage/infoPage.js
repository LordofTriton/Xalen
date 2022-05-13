import React, { useState } from "react";
import './infoPage.css'

const InfoPage = ({CortexControl}) => {
    const [infoDisplay, setInfoDisplay] = useState("Overview")

    let toggle = CortexControl.infoPage;
    let theme = CortexControl.theme;

    return(
        <div className="infoPageContainer" style={{top: toggle ? "70px" : "-100vh", backgroundColor: theme === "Light" ? "whitesmoke" : "#121212"}}>
            <h3 className="comic">You know you could just ask me this stuff, right?</h3>
            <div className="infoSideBar">
                <h3 className="infoSideBarLink" style={{color: infoDisplay === "Overview" ? "white" : "var(--blue)", backgroundColor: infoDisplay === "Overview" ? "var(--blue)" : "transparent"}} onClick={() => setInfoDisplay("Overview")}>Overview</h3>
                <h3 className="infoSideBarLink" style={{color: infoDisplay === "Developer" ? "white" : "var(--blue)", backgroundColor: infoDisplay === "Developer" ? "var(--blue)" : "transparent"}} onClick={() => setInfoDisplay("Developer")}>Developer</h3>
                <h3 className="infoSideBarLink" style={{color: infoDisplay === "Pricing" ? "white" : "var(--blue)", backgroundColor: infoDisplay === "Pricing" ? "var(--blue)" : "transparent"}} onClick={() => setInfoDisplay("Pricing")}>Pricing</h3>
                <h3 className="infoSideBarLink" style={{color: infoDisplay === "Platforms" ? "white" : "var(--blue)", backgroundColor: infoDisplay === "Platforms" ? "var(--blue)" : "transparent"}} onClick={() => setInfoDisplay("Platforms")}>Platforms</h3>
                <h3 className="infoSideBarLink" style={{color: infoDisplay === "Language" ? "white" : "var(--blue)", backgroundColor: infoDisplay === "Language" ? "var(--blue)" : "transparent"}} onClick={() => setInfoDisplay("Language")}>Language</h3>
            </div>
            <div className="infoDisplayBox">
                {
                    infoDisplay === "Overview" ?
                        <>
                        <h3 className="infoTitle">Who is Xalen?<span>Who, not what.</span></h3>
                        <h3 className="infoText">Xalen is your friend.</h3>
                        <h3 className="infoText">A snarky, sarcastic, sometimes idiotic friend, but a friend nonetheless. 😅</h3>
                        <h3 className="infoText">Xalen is a self learning conversational chatbot designed to hold funny and witty conversations with users through artificial intellignece methods that enable the program to communicate like an actual human being.</h3>
                        <h3 className="infoText">Xalen learns from each and every conversation, becoming better and more intelligent, improving it's ability to hold conversations like a boss. 😎</h3>
                        <br/>
                        <br/>
                        <h3 className="infoText">Xalen will deny being a bot.</h3>
                        <h3 className="infoText">No matter what Xalen tells you, it is definitely a bot. 😉</h3>
                        </>
                    : null
                }
                {
                    infoDisplay === "Developer" ?
                        <>
                        <h3 className="infoTitle">Who created Xalen?</h3>
                        <h3 className="infoText">Hi. My name is Joshua Agboola. 😎</h3>
                        <h3 className="infoText">I'm a Computer Science student based in Lagos, Nigeria.</h3>
                        <h3 className="infoText">I built this bot cause I always wanted my own J.A.R.V.I.S, like literally anyone who watched knows IronMan. 😏</h3>
                        <h3 className="infoText">It's built with MongoDB, Express, ReactJS, and Node.js (MERN Stack).</h3>
                        <h3 className="infoText">Hope you like it!</h3>
                        <br/>
                        <br/>
                        <h3 className="infoText">Lemme know what you think.</h3>
                        <h3 className="infoText">Phone: +234 7065194708</h3>
                        <h3 className="infoText">Email: agboola918@gmail.com</h3>
                        </>
                    : null
                }
                {
                    infoDisplay === "Pricing" ?
                        <>
                        <h3 className="infoTitle">Is Xalen free?</h3>
                        <h3 className="infoText">Yup. 😎</h3>
                        <h3 className="infoText">Chatting with Xalen is completely free!</h3>
                        </>
                    : null
                }
                {
                    infoDisplay === "Platforms" ?
                        <>
                        <h3 className="infoTitle">What platforms are supported?</h3>
                        <h3 className="infoText">At the moment, Xalen can only be accessed from your browser at <a href="https://xalen.netlify.app">xalen.netlify.app</a>. But applications for PC and mobile are in the works and will be available soon!</h3>
                        </>
                    : null
                }
                {
                    infoDisplay === "Language" ?
                        <>
                        <h3 className="infoTitle">What languages can Xalen speak?</h3>
                        <h3 className="infoText">Well, technically Xalen can learn all languages from user conversations, but it only knows English by default. 🙂</h3>
                        <h3 className="infoText">Support for other languages will be added in future!</h3>
                        </>
                    : null
                }
            </div>
    
        </div>
    )
}

export default InfoPage;