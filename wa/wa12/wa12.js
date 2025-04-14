var newBtn = document.querySelector('#js-new-quote').addEventListener('click', initiateCatdown);
var quoteBox = document.querySelector('#js-quote-text');

var endpoint = "https://api.thecatapi.com/v1/images/search";

let current = {url: "", width: "", height: ""};

function initiateCatdown(){
    for(let i=0; i<8; i++){
        getCat();
    }
}

async function getCat() {
    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const json = await response.json();

        const imgInfo = json[0];

        let id = imgInfo.id;
        let url = imgInfo.url;
        let width = imgInfo.width;
        let height = imgInfo.height;

        if(height >= 125){
            let sizeDif = 125/height;
            width = width*sizeDif;
            height = height*sizeDif;
        };

        let styleString = "width:WIDENESSpx;height:TALLNESSpx;padding-left:5px;"
        styleString = styleString.replaceAll('WIDENESS',width);
        styleString = styleString.replaceAll('TALLNESS',height);

        const newImage = document.createElement('img');
        newImage.setAttribute('src', url);
        newImage.setAttribute('alt', "cat image");
        newImage.setAttribute('style', styleString);

        newImage.addEventListener('click', () => {
            window.open(url);
        });

        quoteBox.appendChild(newImage);
    } catch(err) {
        console.log(err);
    }
}

