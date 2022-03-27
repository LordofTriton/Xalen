const nlp = require('compromise')
nlp.extend(require('compromise-sentences'))

const GetContext = ({text}) => {
    console.log("Context:", nlp(text).sentences().subjects().text());
}

export default GetContext;