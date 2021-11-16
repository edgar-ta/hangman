import { Hangman } from "./scripts/hangman.js";
import { LetterPanel } from "./scripts/letter-panel.js";
import { Word } from "./scripts/word.js";
import { LetterSpacePanel } from "./scripts/letter-space-panel.js";

customElements.define("hangman-canvas", Hangman, {"extends": "canvas"});
customElements.define("letter-panel", LetterPanel, {"extends": "div"});
customElements.define("letter-space-panel", LetterSpacePanel, {"extends": "div"});


let 
/** @type {number} */
roundsPlayed = 0, 

/** @type {number} */
roundsWon = 0, 

/** @type {number} */
pointsMade = 0;



/** @type {Hangman} */
let hangman = document.querySelector("[is='hangman-canvas']");

/** @type {Word} */
// vscode doesn't say so, but I'm pretty sure the `await` keyword
// has some effect on this expression, and also on many others of the files I just modified
let word = await getRandomWord();

/** @type {LetterSpacePanel} */
let letterSpacePanel = document.querySelector("[is='letter-space-panel']");

/** @type {LetterPanel} */
let letterPanel = document.querySelector("[is='letter-panel']");

letterPanel.letters.forEach(letter => letter.addEventListener("click", () => checkSingleLetter(letter)));
letterSpacePanel.populateBy(word);

document.querySelector("#guessForm").addEventListener("submit", (e) => { e.preventDefault() } );

function updateHUD() {
    document.querySelector("#roundsPlayedOut").innerText = roundsPlayed;
    document.querySelector("#roundsWonOut").innerText = roundsWon;
    document.querySelector("#pointsMadeOut").innerText = pointsMade;
}

/**
 * Gets a random word from the word class
 * and acts if something goes wrong
 * @returns {Word} Random word from the datamuse API
 */
async function getRandomWord() {
    // let res;
    // await Word.getRandomWord()
    // .then(resWord => res = resWord)
    // .catch(_ => {
    //     onFailedConnection();
    //     return res = new Word("programming", "technology");
    // });
    // return res;

    // i commented the code above so that I don't exhaust the API while testing
    return new Word("programming", "technology");
}

async function onNewGame() {
    roundsPlayed = 0;
    roundsWon = 0;
    pointsMade = 0;
    updateHUD();
    word = await getRandomWord();
    hangman.initColor(`${word.content}`, "#ffffff", "#0000ff");
    hangman.cleanHead();
    letterSpacePanel.populateBy(word);
}

/**
 * Displays a message for the user to see (a span or something)
 * @fired When something goes wrong with the connection to the API
 */
function onFailedConnection() {
    console.log("Oh no, we couldn't access the API 😱😓");
}

/**
 * Checks if the user's guess (the text of the letter) is right or not
 * and acts accordingly
 * 
 * ---
 * If the letter is already disabled (which means its text has already been used)
 * then calls handleRepeat
 * @param {HTMLButtonElement} letter Letter the containing the user's guess belongs to
 */
function checkSingleLetter(letter) {
    let guess = letter.innerText;
    if (letter.disabled) return handleRepeat(guess);
    letter.disabled = true;
    let matches = word.getMatchingPositions(guess);
    if (matches.length == 0) handleMistake(guess);
    else handleRight(guess, matches);
}

/**
 * Shows a message warning the user that their guess
 * has already been used (and cannot be used again in the current round)
 * @fired When the user repeats a guess
 * @param {string} guess Already in-put guess
 */
function handleRepeat(guess) {
    console.log(`Your guess: ${guess} has already been used`);
}

/**
 * Shows a message warning the user that they have made a mistake
 * 
 * ---
 * Also, decreases the lives of the hangman and calls onLose if necessary
 */
function handleMistake(guess) {
    console.log(`Your guess: ${guess} was a mistake`);
}

/**
 * Shows a message notifying the player of their good guess
 * and reveals the matches of that guess
 */
function handleRight(guess, matches) {
    console.log(`That guess: ${guess} was a good one!`);
    letterSpacePanel.revealMatches(guess, matches);
}

console.log(Word.getRandomWord());