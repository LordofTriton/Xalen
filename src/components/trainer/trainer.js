import React, {useState} from "react";
import axios from "axios";
import './trainer.css'

import TrainingData from "./trainData";
import MatchService from "../../services/matcher";
import DateTime from "../../services/dateTime";

const baseAPIURL = "http://localhost:3001/responseStore";

const Trainer = ({theme}) => {
    const [learningProgress, setLearningProgress] = useState(0)
    const [context, setContext] = useState([])

    const learnStuff = () => {
        if (learningProgress <= TrainingData.length) {
            const currentMessage = TrainingData[learningProgress]
            console.log("Current:", currentMessage)
            console.log("Context:", context)
            if (learningProgress === 0) {
                axios.get(baseAPIURL).then(re => {
                    setContext(re.data[Object.keys(Object.keys(re.data).indexOf(currentMessage))])
                })
            }
            else {
                if (!MatchService.GetArrayMatch(context, DateTime.addStamp(currentMessage))) {
                    axios.get(baseAPIURL).then(re => {
                        let store = {...re.data, [TrainingData[learningProgress - 1]]: [...re.data[[TrainingData[learningProgress - 1]]], DateTime.addStamp(currentMessage)]}
                        store = {...store, [DateTime.addStamp(currentMessage)]: []}
                        console.log("Store:", store)
                        axios.post(baseAPIURL, store).then(re => {
                            setContext(re.data[Object.keys(Object.keys(re.data).indexOf(DateTime.addStamp(currentMessage)))])
                        })
                    })
                }
            }
            setLearningProgress(learningProgress + 1);
        }
    }

    setTimeout(() => learnStuff(), 2000)

    return(
        <div className="trainerContainer" style={{backgroundColor: theme === "Light" ? "white" : "#121212"}}>
            <div className="trainerLoader">
                <div className="trainerLoaderBar" style={{animationDelay: `${Math.random()}s`}}></div>
                <div className="trainerLoaderBar" style={{animationDelay: `${Math.random()}s`}}></div>
                <div className="trainerLoaderBar" style={{animationDelay: `${Math.random()}s`}}></div>
                <div className="trainerLoaderBar" style={{animationDelay: `${Math.random()}s`}}></div>
            </div>
            <h3 className="trainingProgress">{learningProgress / TrainingData.length * 100}%</h3>
        </div>
    )
}

export default Trainer;