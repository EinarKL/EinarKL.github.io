let currentTile = "";

$(() => {
    init();
});

function init() {
    adjustSize();
    createSquares();
    $("#result").text("");
    nextTile();
}

function createSquares() {
    let size = $("#board").width() / 8;
    for (let y = 0; y < 8; y++) {
        let row = "<tr>";
        for (let x = 0; x < 8; x++) {
            let col = (y + x) % 2 === 0 ? "#F0D9B5" : "#B58863";
            let id = ["a", "b", "c", "d", "e", "f", "g", "h"][x] + [8, 7, 6, 5, 4, 3, 2, 1][y];
            let style = "background-color: " + col + "; width: " + size + "px; height: " + size + "px;";
            let tile = "<td><div id='" + id + "' class='tiles' style='" + style + "' onclick='checkTile(\"" + id + "\")'></div></td>";
            row += tile;
        }
        row += "</tr>";
        $("#board").append(row);
    }
}

function checkTile(tile) {
    if (currentTile === tile) {
        $("#result").text("Correct!");
        nextTile();
    }
    else {
        $("#result").text("Incorrect...");
    }
}

function nextTile() {
    let rl = ["a", "b", "c", "d", "e", "f", "g", "h"][Math.floor(Math.random() * 8)];
    let rn = Math.floor(Math.random() * 7) + 1;

    currentTile = rl + rn;
    $("#tile").text(currentTile);
}

function adjustSize() {
    let size;
    if ($("body").width() >= $("body").height()) {
        size = $("#content").height() * 8 / 10;
    }
    else {
        size = $("#content").width() * 8 / 10;
    }
    $("#board").width(size);
    $("#board").height(size);
}