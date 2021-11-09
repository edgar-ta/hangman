/**
 * Class emulating an rgb color
 */
class Color {

    /**
    * Digits used for hexadecimal representation
    * @type {string[]}
    */
    static hexDigits = [
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'
    ];

    /** 
     * Red value of the color
     * @type {number}
     */
    r;

    /**
     * Green value of the color
     * @type {number}
     */
    g;

    /**
     * Blue value of the color
     * @type {number}
     */
    b;

    /**
     * Simple constructor
     * @constructor Simple constructor
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     */
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    /**
     * Converts an integer to a hex string
     * @param {number} n Number to convert
     * @returns {string} Hexadecimal representation of the number
     */
    static toHex(n) {
        let div = ~~(n / 16);
        let mod = ~~(n % 16);
        return Color.hexDigits[div] + Color.hexDigits[mod];
    }

    /**
     * Converts a hexadecimal string of two digits into a decimal number
     * @param {string} doubleDigitString Hex string to parse into decimal
     * @returns {number} Integer corresponding to the string
     */
    static fromHex(doubleDigitString) {
        let firstChar = doubleDigitString.charAt(0);
        let secondChar = doubleDigitString.charAt(1);
        let first = Color.hexDigits.indexOf(firstChar);
        let second = Color.hexDigits.indexOf(secondChar);
        return first * 16 + second;
    }

    /**
     * Parses a hexadecimal string (of 7 digits; including the #)
     * into an rgb color
     * @param {string} hexString String to get a color from
     * @returns {Color} RGB color corresponding to the string
     */
    static colorFromHex(hexString) {
        let [r, g, b] = [hexString.substr(1, 2), hexString.substr(3, 2), hexString.substr(5, 2)];
        return new Color(Color.fromHex(r), Color.fromHex(g), Color.fromHex(b));
    }

    /**
     * Gets the hex representation of the color
     * @returns {string} Hex of the color
     */
    toHex() {
        return `#${Color.toHex(this.r)}${Color.toHex(this.g)}${Color.toHex(this.b)}`;
    }

    /**
     * Substracts two colors (their rgbs) and returns a new
     * color with those values
     * @param {Color} color First color (the one to substract from)
     * @param {Color} kolor Second color (the one to substract)
     * @returns {Color} Resultant color
     */
    static sub(color, kolor) {
        return new Color(color.r - kolor.r, color.g - kolor.g, color.b - kolor.b);
    }

    /**
     * Sums two colors (their rgbs) and returns a new
     * color with those values
     * @param {Color} color First color to sum
     * @param {Color} kolor Second color to sum
     * @returns {Color} Resultant color
     */
    static sum(color, kolor) {
        return new Color(color.r + kolor.r, color.g + kolor.g, color.b + kolor.b);
    }
}

/**
 * Class that emulates the behavior of the hangman.
 * 
 * It shows an image of a hangman and it changes the color
 * of its head to show how hung it is.
 */
class Hangman extends HTMLCanvasElement {
    /**
     * X coordinate of the head in the image of the hangman
     */
    static HEAD_X = 270.75;

    /**
     * Y coordinate of the head in the image of the hangman
     */
    static HEAD_Y = 139;

    /**
     * Radius of the head in the the image of the hangman
     */
    static HEAD_R = 32;


    /**
     * Remaining number of mistakes a user can make before
     * the hangman is hung
     * @type {number}
     */
    remainingMistakes;

    /**
     * Color representing the stage the hangman is currently in
     * @type {Color}
     */
    currentColor;

    /**
     * Delta the hangman will use to advance to another stage
     * @type {Color} 
     */
    delta;

    /**
     * Simple constructor
     * @constructor Simple constructor
     * @param {number} maxMistakes Maximum number of mistakes a user can make before the hangman gets hung
     * @param {Color} initialColor Hexadecimal color the hangman will start with
     * @param {Color} finalColor Hexadecimal color the hangman will end up with (when completely hung)
     */
    constructor() {
        super();

        let maxMistakes = Number.parseInt(this.getDefaultAttribute("max-mistakes", "10"));
        let initialColor = Color.colorFromHex(this.getDefaultAttribute("initial-color", "#ffffff"));
        let finalColor = Color.colorFromHex(this.getDefaultAttribute("final-color", "#0000ff"));
        let sub = Color.sub(finalColor, initialColor);

        this.remainingMistakes = maxMistakes;
        this.currentColor = initialColor;
        this.delta = new Color(
            sub.r / (maxMistakes + 1),
            sub.g / (maxMistakes + 1),
            sub.b / (maxMistakes + 1)
        );

        this.setAttribute("class", "hangman-img");

        let img = document.createElement("img");
        img.src = this.getAttribute("src");
        let size = Number.parseInt(this.getDefaultAttribute("size", "1000"));

        this.setAttribute("width", `${size}`);
        this.setAttribute("height", `${size}`);

        window.onload = () => {
            this.getContext("2d").drawImage(img, 0, 0, size, size);
        }
    }

    /**
     * Checks if a certain attribute exists in the canvas;
     * if it does, then return that attribute, if not,
     * return the default value
     * @param {string} qualifiedName Name of the attribute to get
     * @param {string} defaultValue Default value of the attribute
     * @returns The attribute or the default value
     */
    getDefaultAttribute(qualifiedName, defaultValue) {
        if (this.hasAttribute(qualifiedName))
            return this.getAttribute(qualifiedName);
        return defaultValue;
    }

    /**
     * Decreases the remaining mistakes the user can make, 
     * makes its current color closer to the final one
     * and colors the head
     */
    advanceStage() {
        // debugger
        this.currentColor = Color.sum(this.currentColor, this.delta);
        this.remainingMistakes--;
        this.colorHead();
    }

    /**
     * Colors the head of the hangman using its current color
     */
    colorHead() {
        let ctx = this.getContext("2d");
        ctx.fillStyle = this.currentColor.toHex();
        ctx.ellipse(Hangman.HEAD_X, Hangman.HEAD_Y, Hangman.HEAD_R, Hangman.HEAD_R, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

    /**
     * Checks if the hangman is already hung
     * @returns {boolean} If is hung
     */
    isHung() {
        return this.remainingMistakes <= 0;
    }
}

export { Hangman, Color }