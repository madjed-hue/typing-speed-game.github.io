// Array Of Words
const easyWords = [
  "Hello",
  "Code",
  "Town",
  "Twitter",
  "Github",
  "Python",
  "Scala",
  "Coding",
  "Funny",
  "Working",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
];

const normalWords = [
  "Linkedin",
  "Country",
  "Testing",
  "Youtube",
  "Leetcode",
  "Internet",
  "Playing",
  "Paradigm",
  "Styling",
  "Cascade",
  "facebook",
  "netflix",
  "reading",
  "contact",
  "person",
];

const hardWords = [
  "Programming",
  "Javascript",
  "Destructuring",
  "Documentation",
  "Dependencies",
  "biography",
  "typewriting",
  "omnidirectionnel",
  "acknowledge",
  "achievement",
  "administration",
  "advertising",
  "agricultural",
  "alternative",
  "anniversary",
];

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Default Level
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let theOverlay = document.querySelector(".overlay");

//create the welcome screen
let getReadyDiv = document.createElement("div");
let getReadyBtn = document.createElement("span");
getReadyDiv.className = "ready-container";
getReadyBtn.className = "ready-btn";
getReadyBtn.innerText = "Prepare yourself";
getReadyDiv.appendChild(getReadyBtn);
theOverlay.appendChild(getReadyDiv);
//select the choices
let theChoices = document.createElement("select");
let choicesOptionOne = document.createElement("option");
let choicesOptionTwo = document.createElement("option");
let choicesOptionThree = document.createElement("option");
choicesOptionOne.innerText = "Easy";
choicesOptionTwo.innerText = "Normal";
choicesOptionThree.innerText = "Hard";
theChoices.appendChild(choicesOptionOne);
theChoices.appendChild(choicesOptionTwo);
theChoices.appendChild(choicesOptionThree);
getReadyDiv.appendChild(theChoices);

// Setting Level Name + Seconds + Score
lvlNameSpan.innerText = defaultLevelName;
secondsSpan.innerText = defaultLevelSeconds;
timeLeftSpan.innerText = defaultLevelSeconds;
scoreTotal.innerText = easyWords.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
};

function genWords() {
  // Get Random Word From Array
  let randomWord = easyWords[Math.floor(Math.random() * easyWords.length)];
  // Get Word Index
  let wordIndex = easyWords.indexOf(randomWord);
  // Remove WordFrom Array
  easyWords.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < easyWords.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(easyWords[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (easyWords.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratulations !! 🚀");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
