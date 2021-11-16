import { Word } from "./word.js";

export class LetterSpacePanel extends HTMLDivElement {
    /**
     * Array that's going to save the spaces for the letters of
     * the word to guess
     * @type {HTMLDivElement[]}
     */
    letterSpaces = [];

    constructor() {
        super();
        this.setAttribute("class", "letter-space-panel");
    }

    /**
     * Populates the panel with enough spaces for the content of
     * the word.
     * ---
     * 
     * Also, makes sure there aren't any other spaces
     * @param {Word} word Word to set
     */
    populateBy(word) {
        this.querySelectorAll(".letter-space").forEach(letterSpace => letterSpace.remove());
        for (let _ of word.content) {
            let letterSpace = document.createElement("div");
            letterSpace.setAttribute("class", "letter-space");
            this.appendChild(letterSpace);
            this.letterSpaces.push(letterSpace);
        }
    }

    /**
     * Shows the spaces where the user's guess (the letter) matched
     * @param {string} letter User's guess
     * @param {number[]} matches Maching positions of the user's guess
     */
    revealMatches(letter, matches) {
        for (let match of matches) this.letterSpaces[match].innerText = letter;
    }
}