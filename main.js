import { Color, Hangman } from "./scripts/hangman.js";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function populateLetterPanel() {
    let letterPanel = document.querySelector(".letter-panel");
    for (let char of ALPHABET) {
        let letter = document.createElement("button");
        letter.setAttribute("class", "letter-panel__button");
        letter.innerText = char;
        letterPanel.appendChild(letter);
    }
}

document.querySelector("#guessForm").addEventListener("submit", (e) => {
    e.preventDefault();
})

populateLetterPanel();

customElements.define("hangman-canvas", Hangman, {"extends": "canvas"});