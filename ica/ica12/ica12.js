var newBtn = document.querySelector('#js-new-quote').addEventListener('click', getQuote);
var answerBtn = document.querySelector('#js-tweet');

var endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

let current = {question: "", answer: ""};

async function getQuote() {
    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const json = await response.json();
        displayQuote(json.question);

        current.question = json.question;
        current.answer = json.answer;

    } catch(err) {
        console.log(err);
        alert('fail');
    }
}

answerBtn.addEventListener('click', displayAnswer)

function displayQuote(quote){
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
    displayAnswer("bean")
}

function displayAnswer(toggle){
    const answerText = document.querySelector('#js-answer-text');
    if(toggle === "bean"){
        answerText.textContent = ""
    } else {
        answerText.textContent = current.answer
    }
}