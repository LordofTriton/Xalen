function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function convertWordToRegexString(word) {
    // Start by escaping any special characters that might be in the string:
    word = escapeRegExp(word);
    // Replace all vowels with alternations of their l33t alternatives:
    const l33t = { a: "4@", e: "3", i: "1|!", o: "0" };
    return word.replace(/[aeio]/g, c => `[${c}${l33t[c]}]+`);
}

const badWords = ["fuck", "cunt", "pussy", "vagina", "bitch", "shit", "sex", "shag", "fetish", "porn", "blowjob", "doggystyle", "cowgirl", "cock", "dick", "penis", "boobs", "tits", "bastard", "wanker", "bullshit", "motherfucker", "sisterfucker", "fatherfucker", "asshole", "ass", "clit", "nigga", "nigger", "crap", "prick", "goddamn", "effing", "bollocks", "arse", "arsehole", "slut", "twat", "milf", "whore", "gigolo", "stripper", "damn", "fanny", "piss", "dork", "nerd", "tities", "balls", "sod", "fool", "dumbass", "idiot", "moron", "dumb", "stupid", "pornstar", "slave", "horseshit"];
const badWordsRegexString = "\\b(" + badWords.map(convertWordToRegexString).join("|") + ")\\b";
const badWordsRegex = new RegExp(badWordsRegexString, 'ig');

function CensorText(text) {
    let newText = text.replace(badWordsRegex, badWord => "*".repeat(badWord.length));
    return newText
}

const Censor = {CensorText}

export default Censor;