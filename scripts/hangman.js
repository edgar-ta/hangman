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
        let mod = n % 16;
        return hexDigits[div] + hexDigits[mod];
    }

    /**
     * Converts a hexadecimal string of two digits into a decimal number
     * @param {string} doubleDigitString Hex string to parse into decimal
     * @returns {number} Integer corresponding to the string
     */
    static fromHex(doubleDigitString) {
        let first = Number.parseInt(doubleDigitString.charAt(0));
        let second = Number.parseInt(doubleDigitString.charAt(1));
        return first * 16 + second;
    }

    /**
     * Parses a hexadecimal string (of 7 digits; including the #)
     * into an rgb color
     * @param {string} hexString String to get a color from
     * @returns {Color} RGB color corresponding to the string
     */
    static colorFromHex(hexString) {
        let [ r, g, b] = [ hexString.substr(1, 2), hexString.substr(3, 2), hexString.substr(5, 2) ];
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
     * Sums 2 colors into 1
     * @param {Color} color First color to sum
     * @param {Color} kolor Second color to sum
     * @returns {Color} Resultant color
     */
    static sum(color, kolor) {
        return new Color(color.r + kolor.r, color.g + kolor.g, color.b + kolor.b);
    }
}

class Hangman extends HTMLCanvasElement {

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
        
        let maxMistakes = Number.parseInt(this.getAttribute("max-mistakes")) ?? 10;
        let initialColor = Color.colorFromHex(this.getAttribute("initial-color") ?? "#ffffff");
        let finalColor = Color.colorFromHex(this.getAttribute("final-color") ?? "#0000ff");
        let sum = Color.sum(initialColor, finalColor);
        
        this.remainingMistakes = maxMistakes;
        this.currentColor = initialColor;
        this.delta = new Color(
            sum.r / (maxMistakes + 1),
            sum.g / (maxMistakes + 1),
            sum.b / (maxMistakes + 1)
        );

        let img = document.createElement("img");
        img.src = this.getAttribute("src");
        let width = this.offsetWidth;
        let height = this.offsetHeight;
        this.getContext("2d").drawImage(img, 0, 0, width, height);
    }

    /**
     * Decreases the remaining mistakes the user can make, 
     * makes its current color closer to the final one
     * and colors the head
     */
    advanceStage() {
        this.currentColor = Color.sum(this.currentColor, this.delta);
        this.remainingMistakes--;
        colorHead();
    }

    /**
     * Colors the head of the hangman using its current color
     */
    colorHead() {
        // 
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