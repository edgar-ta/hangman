export class Word {
    /**
     * Actual content of the word
     * @type {string}
     */
    content;

    /**
     * Category the word belongs to
     * @type {string}
     */
    category;

    /**
     * Collection of different letters
     * the content of the word has
     * @type {string[]}
     */
    differentLetters = [];

    /**
     * Simple constructor
     * @constructor Simple constructor
     * @param {string} content Content of the word
     * @param {string} category Category the word belongs to
     */
    constructor(content, category) {
        this.content = content;
        this.category = category;
        this.differentLetters = Word.getDifferentLetters(content);
    }

    /**
     * Gets the matches of a letter in the content of the word
     * and returns the positions of those matches
     * @param {string} letter Letter to look for in the content of the word
     * @returns {number[]} Positions of the matches
     */
    getMatchingPositions(letter) {
        let positions = [];
        let matches = this.content.matchAll(new RegExp(`${letter}`, "gi"));
        for (match of matches) {
            console.log(match);
        }
    }

    /**
     * Gets the different letters a string has
     * @param {string} content Content to get different letters from
     * @returns {string[]} Different letters of the content
     */
    static getDifferentLetters(content) {
        let res = [];
        for (letter of content) {
            if (!res.includes(letter)) res.push(letter);
        }
        return res;
    }
}