import axios from "axios"

const host = "localhost"
const port = "3001"

const baseAPIURL = `${host}:${port}`

const getChatHistory = () => {
    let data = []
    axios.get(`${baseAPIURL}/chatHistory`).then(re => {
        data.push(re.data)
    })
    return data
}

const APIService = {baseAPIURL, getChatHistory}

export default APIService