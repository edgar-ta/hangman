export class LetterPanel extends HTMLDivElement {
    static ALPHABET = "abcdefghijklmnopqrstuvwxyz";

    /**
     * @type {HTMLButtonElement[]}
     */
    letters = [];

    constructor() {
        super();
        this.setAttribute("class", "letter-panel");
        this.populate();
    }

    /**
     * Generates the letters that will occupy the panel
     */
    populate() {
        for (let char of LetterPanel.ALPHABET) {
            let letter = document.createElement("button");
            letter.setAttribute("class", "letter-panel__button");
            letter.innerText = char;
            this.append(letter);
            this.letters.push(letter);
        }
    }

    /**
     * Gets the button whose text is equal to the string passed
     * and returns if it's disabled or not
     * @param {string} char Letter to check for
     * @returns {boolean} If the button is disabled
     */
    isDisabled(char) {
        return this.letters.find(letter => letter.innerText == char)?.disabled;
    }
    
}