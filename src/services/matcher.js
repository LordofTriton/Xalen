import DateTime from "./dateTime";

const stringSimilarity = require("string-similarity");

const matchThreshold = 0.5;

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

    return index;
}

function GetArrayMatch(store, message) {
    let index = -1;
    let match = matchThreshold;
    for (let i = 0; i < store.length; i++) {
        let difference = stringSimilarity.compareTwoStrings(DateTime.removeStamp(message), DateTime.removeStamp(store[i]))
        if (difference >= match) {
            index = i;
            match = difference;
        }
    }

    return index;
}

const MatchService = {GetMatch, GetArrayMatch}

export default MatchService;