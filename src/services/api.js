import axios from "axios"

const baseAPIURL = `https://lordoftriton.github.io/data/ZeusDB.json`

const getChatHistory = () => {
    let data = []
    axios.get(`${baseAPIURL}/chatHistory`).then(re => {
        data.push(re.data)
    })
    return data
}

const getResponseStore = () => {
    let data = axios.get("https://lordoftriton.github.io/data/ZeusDB.json").then(re => re.data)
    return data.responseStore ? data.responseStore : {}
}

const APIService = {baseAPIURL, getChatHistory, getResponseStore}

export default APIService