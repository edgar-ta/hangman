import { Hangman } from "./scripts/hangman.js";
import { LetterPanel } from "./scripts/letter-panel.js";

document.querySelector("#guessForm").addEventListener("submit", (e) => {
    e.preventDefault();
})


/**
 * @type {Hangman}
 */
// let hangman = document.querySelector("canvas");

// hangman.advanceStage();

// setTimeout(() => hangman.adv)

customElements.define("hangman-canvas", Hangman, {"extends": "canvas"});
customElements.define("letter-panel", LetterPanel, {"extends": "div"});