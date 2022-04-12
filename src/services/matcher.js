import DateTime from "./dateTime";

const stringSimilarity = require("string-similarity");

const matchThreshold = 0.5;

function StripMessage(text) {
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

        if (difference >= match) {
            index = i;
            match = difference;
        }
    }

    if (index < 0) {
        let phraseIndex = 0;
        for (let i = 0; i < store.length; i++) {
            let difference = 0;
            let processedStore = ` ${StripMessage(DateTime.removeStamp(store[i])).toLowerCase()}`
            let processedMessage = ` ${StripMessage(DateTime.removeStamp(message.content)).toLowerCase()}`

            if (processedMessage.includes(processedStore)) {
                if (processedMessage.indexOf(processedStore) > phraseIndex) {
                    phraseIndex = processedMessage.indexOf(processedStore);
                    difference = 1;
                }
            }

            if (difference > 0) index = i;
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

const MatchService = {GetMatch, GetArrayMatch, GetParentIndex, StripMessage}

export default MatchService;