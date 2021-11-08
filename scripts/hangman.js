/**
 * Class emulating an rgb color
 */
class Color {
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
     * Gets the hex representation of the color
     * @returns {string} Hex of the color
     */
    toHex() {
        return "something";
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

class Hangman extends HTMLImageElement {

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
    constructor(maxMistakes, initialColor, finalColor) {
        super();
        this.remainingMistakes = maxMistakes;
        this.currentColor = initialColor;
        let sum = Color.sum(initialColor, finalColor);
        this.delta = new Color(
            sum.r / (maxMistakes + 1),
            sum.g / (maxMistakes + 1),
            sum.b / (maxMistakes + 1)
        );
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