let initializedScripts = false;

export function initScripts() {
    let script = document.createElement('script');
    let url = "https://einarkl.github.io/Kubing/Tools/tools.js";
    script.setAttribute('src', url);

    document.head.appendChild(script);
}

export class EinarDrawScramble extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
    }

    connectedCallback() {
        initScripts();
        setTimeout(() => {
            let id = "svgEinarDrawScramble_" + (this.getAttribute("id") ? this.getAttribute("id") : "");
            let puzzle = this.getAttribute("puzzle") ? getPuzzle(this.getAttribute("puzzle")) : "3x3";
            let scramble = this.getAttribute("scramble") ? this.getAttribute("scramble") : "";

            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("id", id);
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            this.appendChild(svg);
            this.setAttribute("width", "100%");
            this.setAttribute("height", "100%");

            drawScramble("#" + id, puzzle, scramble);
            this.initialized = true;
        }, 500);
    }
    
    static get observedAttributes() {
        return ["puzzle", "scramble"];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (this.initialized) {
            let id = "svgEinarDrawScramble_" + (this.getAttribute("id") ? this.getAttribute("id") : "");
            let puz = this.getAttribute("puzzle") ? getPuzzle(this.getAttribute("puzzle")) : "3x3";
            let scr = this.getAttribute("scramble") ? this.getAttribute("scramble") : "";
            drawScramble("#" + id, puz, scr);
        }
    }
}

function getPuzzle(puzzle) {
    if (["3x3", "2x2", "4x4", "5x5", "6x6", "7x7", "skewb", "pyraminx", "megaminx", "clock", "square-1", "sq1"].indexOf(puzzle) !== -1) {
        return puzzle;
    }
    else {
        return "3x3";
    }
}

function drawScramble(id, puzzle, scramble) {
    resetDrawSvg(id);
    let functions = [drawScrambleSkewb, drawScramblePyraminx, drawScrambleMegaminx, drawScrambleClock, drawScrambleSq1, drawScrambleSq1];
    let n = NaN;
    if (puzzle.split("x").length === 2 && puzzle.split("x")[0] === puzzle.split("x")[1]) {
        n = parseInt(puzzle.split("x")[0]);
    }

    if (n) {
        drawScrambleNxN(id, n, scramble);
    }
    else if (["skewb", "pyraminx", "megaminx", "clock", "square-1", "sq1"].indexOf(puzzle) !== -1) {
        functions[["skewb", "pyraminx", "megaminx", "clock", "square-1", "sq1"].indexOf(puzzle)](id, scramble);
    }
    else {
        drawMissingSvg(id);
    }
}

customElements.define("einar-drawscramble", EinarDrawScramble);