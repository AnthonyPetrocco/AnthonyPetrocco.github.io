const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

let storyText = "It was 370 fahrenheit in the oven, so :insertx: wanted to make some pizza. When they got to :inserty: to buy some ingredients, they stared in horror for a few moments, then :inserty: :insertz:. Bob was standing in its place, and laughed with glee before :insertx: dropped a 2000 pound coin on his head.";
let insertX = ["Gilly the Woblin", "Big Daddy", "SANTA CLAUS","Brad Pitt","your mom","Wario","a water bottle","Anthony Pinter","Joseph Stalin", "I", "Elizabeth Frothingham", "King Charles III","Buttface McGee","the United States Constitution","Jesus Christ"];
let insertY = ["Hell's Kitchen","Disney World","the White House","The Salty Spitoon","my house","the refrigerator","Shanghai","Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch","Jupiter","the bathroom","Web","Poland"];
let insertZ = ["spontaneously combusted","melted into a puddle on the sidewalk","turned into a used up dry erase marker","evaporated into hot gas","was eaten by Bob","became a black hole","closed down","was as it always was","shot your dog","became a charity for the homeless","said goodbye and walked away","insulted your mother","opened up for the day"];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(':insertx:', xItem)
    newStory = newStory.replaceAll(':inserty:', yItem)
    newStory = newStory.replaceAll(':insertz:', zItem)

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Bob', name);

  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(2000/14) + ' stone';
    const temperature =  Math.round((370 - 32) * (5/9)) + ' centrigrade';

    newStory = newStory.replaceAll('2000 pound', weight);
    newStory = newStory.replaceAll('370 fahrenheit', temperature);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
