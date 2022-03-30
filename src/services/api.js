import axios from "axios"

// const baseAPIURL = "https://zeuschat-server.herokuapp.com/";
const baseAPIURL = "http://localhost:3001/";

async function getAtheneum() {
    await axios.get(`${baseAPIURL}Atheneum`).then(re => {
        return re.data;
    })
}

async function getYggdrasil() {
    await axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
        return re.data;
    })
}

async function updateYggdrasil(parentMessage, newMessage, Yggdrasil) {
    let data = [];
    await axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
        let store = {...re.data, [parentMessage]: [...Yggdrasil[parentMessage], newMessage]}
        store = {...store, [newMessage]: []}
        axios.post(`${baseAPIURL}Yggdrasil`, store).then(re => {
            axios.get(`${baseAPIURL}Yggdrasil`).then(re => {
                return re.data;
            })
        })
    })
    return data;
}

/*
if (!keys.includes(lastZeusMsg)) {
    axios.get(`${baseAPIURL}responseStore`).then(re => {
        let store = {...re.data, [lastZeusMsg]: [lastUserMsg]}
        axios.post(`${baseAPIURL}responseStore`, store).then(re => {
            axios.get(`${baseAPIURL}responseStore`).then(re => {
                setResponseStore(re.data)
            })
        })
    })
}
else {
    axios.get(`${baseAPIURL}responseStore`).then(re => {
        let store = {...re.data, [lastZeusMsg]: [...responseStore[lastZeusMsg], lastUserMsg]}
        axios.post(`${baseAPIURL}responseStore`, store).then(re => {
            axios.get(`${baseAPIURL}responseStore`).then(re => {
                setResponseStore(re.data)
            })
        })
    })
} */

const APIService = {
    baseAPIURL,
    getAtheneum,
    getYggdrasil,
    updateYggdrasil
}

export default APIService