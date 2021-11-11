import Categories from "../res/categories.js"

/**
 * Class featuring useful methods for the control of words
 * in the game.
 * 
 * Words must be at least 4 characters long
 */
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
        for (let match of matches) positions.push(match.index);
        return positions;
    }

    /**
     * Gets the different letters a string has
     * @param {string} content Content to get different letters from
     * @returns {string[]} Different letters of the content
     */
    static getDifferentLetters(content) {
        let res = [];
        for (let letter of content) {
            if (!res.includes(letter)) res.push(letter);
        }
        return res;
    }

    /**
     * Gets a random category and content that then
     * uses to create a word
     * @returns {Promise<Response>} Promise featuring the word of random category and content
     */
    static async getRandomWord() {
        let category = Word.getRandomCategory();
        let content = this.getRandomContent();
        return content
        .catch(_ => new Word("programming", "technology"))
        .then(content => new Word(content, category));
    }

    /**
     * Checks within the collection of allowed categories and gets a random one
     * @returns {string} Random category
     */
    static getRandomCategory() {
        return Word.randomElement(Categories);
    }

    /**
     * Queries the datamuse API and gets a word related to the category passed
     * 
     * The content of the word should be at least 4 letters long (to avoid
     * unexpected results the API has)
     * @param {string} category Category the content should be related to
     * @returns {Promise<Response>} Promise that responses a string related to the category
     */
    static async getRandomContent(category) {
        let params = {
            sp: "????*",
            max: 60,
            topics: category
        };
        let url = new URL("https://api.datamuse.com/words");
        url.search = new URLSearchParams(params).toString();
        return fetch(url)
        .then(res => res.json())
        .then(arr => Word.randomElement(arr)["word"]);
    }

    /**
     * Gets an element at a random index from an array
     * @param {any[]} array Array to get an element from
     * @returns {any} Random element
     */
    static randomElement(array) {
        return array[~~(Math.random() * array.length)];
    }
}