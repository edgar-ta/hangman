import { Hangman } from "./scripts/hangman.js";
import { LetterPanel } from "./scripts/letter-panel.js";
import { Word } from "./scripts/word.js";

document.querySelector("#guessForm").addEventListener("submit", (e) => {
    e.preventDefault();
});

(async () => {
    let word = Word.getRandomWord();
    console.log(word);
    // console.log("something");
})()

customElements.define("hangman-canvas", Hangman, {"extends": "canvas"});
customElements.define("letter-panel", LetterPanel, {"extends": "div"});