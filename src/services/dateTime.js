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

const DateTime = {getDateFormatOne ,dayPeriod}

export default DateTime