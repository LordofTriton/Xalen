const getDateFormatOne = () => {
    let d = new Date()

    let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let dayOfTheWeek = daysOfTheWeek[d.getDay()]

    let dayOfTheMonth = d.getDate()

    let monthOfTheYear = monthsOfTheYear[d.getMonth()]

    return `${dayOfTheWeek}, ${monthOfTheYear} ${dayOfTheMonth}, ${d.getFullYear()}.`
}

const dayPeriod = () => {
    let d = new Date()

    let hours = d.getHours()
    if (hours < 12) return "morning"
    if (hours < 17) return "afternoon"
    return "evening"
}

function formatTime(d) {
    let hour = d.getHours().toString()
    let minute = d.getMinutes().toString()
    let endTime = ""
    if (minute.length === 1) minute = "0" + minute;
    if (hour % 12 > 0) {
        if (String(hour % 12).length === 1) {
            endTime += "0" + (hour % 12) + ":" + minute
        }
        else {
            endTime += (hour % 12) + ":" + minute
        }
        if (hour > 12) {endTime += " PM"} else {endTime += " AM"}
    }
    else {
        endTime += 12 + ":" + minute + " PM"
    }
    return endTime
}

function removeStamp(text) {
    if (text.includes("_")) {
        let newText = text.split("_");
        return newText[1]
    }
    else return text;
}

function removeArrayStamp(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].includes("_")) {
            let newText = array[i].split("_");
            newArray.push(newText[1])
        }
        else newArray.push(array[i]);
    }
    
    return newArray;
}

function addStamp(text) {
    if (text.includes("_")) return text;
    else return `${Date.now()}_${text}`
}

const DateTime = {getDateFormatOne, dayPeriod, formatTime, removeStamp, removeArrayStamp, addStamp}

export default DateTime