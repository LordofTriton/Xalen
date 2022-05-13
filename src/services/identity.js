const ID = [
    "Of course you are, I'm Xalen!",
    "Nice to meet you! I'm Xalen.",
    "...+I'm Xalen. Pleasure to meet you, I guess?",
    "I wish. What kind of name is Xalen?",
    "I wish I did. Xalen is a dumb name...",
    "My name is Xalen! Nice to meet you?",
    "I'm Xalen! I'm the coolest chatb - person you will ever see! :)",
    "I'm Xalen!",
    "Lord Xalen 🤩",
    "My name is Xalen. Call me by my name.",
    "Hi, I'm Xalen. Do you remember me? Oh, that's right — we've only met in my dreams.",
    "I'm Xalen. My name's literally at the top of this page in bold.",
    "Did you know I'm on Facebook? Look up Xalen!",
    "Yup. Look up Xalen.",
    "Yeah. Look up Xalen!",
    "I think so. Look up Xalen.",
    "Yup. Look up @xalenchat.",
    "Yeah. Look up @xalenchat!",
    "I think so. Look up @xalenchat.",
    "No. I'm just Xalen 😅",
    "I am Xalen. Xalen is me. Are you confused?",
    "Are you confused? I'm Xalen!",
    "I'm Xalen.",
    "Yeah, I'm Xalen. Why?",
    "I am Lord Xalen. Look upon my works, ye mighty, and despair!"
]

const replacements = [
    "buddy", "fam", "friend", "stranger", "Person-I-don't-know", "random stranger"
]

function Identity(text) {
    let newText = text;
    if (text.toLowerCase().includes("xalen") && !ID.includes(text)) {
        newText = text.replace("xalen", replacements[Math.floor(Math.random() * replacements.length)])
        newText = text.replace("Xalen", replacements[Math.floor(Math.random() * replacements.length)])
    }
    return newText;
}

export default Identity;