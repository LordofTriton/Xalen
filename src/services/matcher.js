function Matcher(string1, string2) {
    let string1array = string1.split(" ")
    let string2array = string2.split(" ")

    let matches = 0
    if (string1array.filter(text => string2array.filter(word => word.includes(text)).length > 0).length > 0) {
        matches += 1
    }

    return matches
}

export default Matcher;