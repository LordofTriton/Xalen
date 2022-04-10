import DateTime from "./dateTime";

const stringSimilarity = require("string-similarity");

const matchThreshold = 0.5;

function stripMessage(text) {
    let returnText = text;
    returnText = returnText.replace(/[^\p{L}\s]/gu, "")
    returnText = returnText.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, "")
    return returnText;
}

function GetMatch(store, message) {
    let index = -1;
    let match = matchThreshold;
    for (let i = 0; i < store.length; i++) {
        let difference = stringSimilarity.compareTwoStrings(DateTime.removeStamp(message.content), DateTime.removeStamp(store[i]))

        if (stripMessage(DateTime.removeStamp(message.content)).includes(stripMessage(DateTime.removeStamp(store[i])))) {
            difference = 1;
        }
        
        if (difference >= match) {
            index = i;
            match = difference;
        }
    }

    return index;
}

function GetArrayMatch(store, parent, message) {
    let parentIndex = -1;
    let messageIndex = -1;
    for (let i = 0; i < store.length; i++) {
        if (DateTime.removeStamp(store[i]) === DateTime.removeStamp(parent)) parentIndex = i;
    }
    if (parentIndex < 0) return parentIndex;
    else {
        for (let i = 0; i < store[parent].length; i++) {
            if (DateTime.removeStamp(store[parent][i]) === DateTime.removeStamp(message)) messageIndex = i;
        }
    }

    return messageIndex;
}

function GetParentIndex(store, parent) {
    let parentIndex = DateTime.removeArrayStamp(store).indexOf(DateTime.removeStamp(parent))
    return parentIndex;
}

const MatchService = {GetMatch, GetArrayMatch, GetParentIndex}

export default MatchService;