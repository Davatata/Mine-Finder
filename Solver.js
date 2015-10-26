// Global variables holding game data
var numflags = 0;
var num_tiles = 0;
var num_rows = 16;
var num_cols = 16;
var num_mines = 40;
var board = new Array(num_rows * num_cols);     // Hidden from player. (0-8, and "mine" initially)
var visib = new Array(num_rows * num_cols);     // Visible to the player.  (Blank tiles initially)
var where = new Array(num_rows * num_cols);     // Tells game where the tile is relative to board. (Top, Bottom, 0, Bottomright...)
var gameover = false;
var myTimer;


// Win  scenario
function youwin(n) {
    console.log(visib);
    clearInterval(myTimer);
    gameover = true;
    alert('You Win!');
}
// Lose scenario
function youlose() {
    clearInterval(myTimer);
    gameover = true;
    if (num_tiles == 0) alert('You Lose. Bad Luck.');
    else alert('You Lose');
}

// Calls solver() if user hasnt clicked, otherwise S1(0)
function solve() {
    if (clicked == false)
        solver();
    else
        S1(0);
}

// This is called if user hasnt clicked any squares yet
function solver() {
    var squares_clicked = new Array(num_rows * num_cols);
    for (var i = 0; i < 256; i++)
        squares_clicked[i] = 0;

    // click randomly until we hit mine or find a zero square
    while (true) {
        i = Math.floor((Math.random() * 256) + 0); // i ranges from 0-255

        if (squares_clicked[i] == 1 || touching_number(i)) {
            continue;
        }
        else {
            squares_clicked[i] = 1;
            var r = clicky(i);                    // r ranges from (-1, 0, ... , 8) to represent (losing, blank, ... , 8)


            if (r == 0) {
                find_ones();
                S1(i);
                break;
            }
            
            else if (r == 1) {
                if (where[i] == "0") {
                    if (touching_all_tiles(i)) {
                        var p = guess_a_touching(i);
                        clicky(p);
                    }
                }
            }
            else if (r == undefined) { break; }
            else {
                switch (where[i]) {
                    case "topleft":
                        if (r == 3) {
                            if (document.images[i + 1].src != "imgs/flag.svg")
                            { rightclick(i + 1); squares_clicked[i + 1] = 1; }
                            if (document.images[i + 16].src != "imgs/flag.svg")
                            { rightclick(i + 16); squares_clicked[i + 16] = 1; }
                            if (document.images[i + 17].src != "imgs/flag.svg")
                            { rightclick(i + 17); squares_clicked[i + 17] = 1; }
                        }
                        break;

                    case "topright":
                        if (r == 3) {
                            if (document.images[i - 1].src != "imgs/flag.svg")
                            { rightclick(i - 1); squares_clicked[i - 1] = 1; }
                            if (document.images[i + 16].src != "imgs/flag.svg")
                            { rightclick(i + 16); squares_clicked[i + 16] = 1; }
                            if (document.images[i + 15].src != "imgs/flag.svg")
                            { rightclick(i + 15); squares_clicked[i + 15] = 1; }

                        }

                        break;

                    case "bottomleft":
                        if (r == 3) {
                            if (document.images[i + 1].src != "imgs/flag.svg")
                            { rightclick(i + 1); squares_clicked[i + 1] = 1; }
                            if (document.images[i - 16].src != "imgs/flag.svg")
                            { rightclick(i - 16); squares_clicked[i - 16] = 1; }
                            if (document.images[i - 15].src != "imgs/flag.svg")
                            { rightclick(i - 15); squares_clicked[i - 15] = 1; }

                        }
                        break;

                    case "bottomright":
                        if (r == 3) {
                            if (document.images[i - 1].src != "imgs/flag.svg")
                            { rightclick(i - 1); squares_clicked[i - 1] = 1; }
                            if (document.images[i - 16].src != "imgs/flag.svg")
                            { rightclick(i - 16); squares_clicked[i - 16] = 1; }
                            if (document.images[i - 17].src != "imgs/flag.svg")
                            { rightclick(i - 17); squares_clicked[i - 17] = 1; }

                        }
                        break;

                    case "top":
                        if (r == 5) {
                            if (document.images[i - 1].src != "imgs/flag.svg")
                            { rightclick(i - 1); squares_clicked[i - 1] = 1; }
                            if (document.images[i + 1].src != "imgs/flag.svg")
                            { rightclick(i + 1); squares_clicked[i + 1] = 1; }
                            if (document.images[i + 15].src != "imgs/flag.svg")
                            { rightclick(i + 15); squares_clicked[i + 15] = 1; }
                            if (document.images[i + 16].src != "imgs/flag.svg")
                            { rightclick(i + 16); squares_clicked[i + 16] = 1; }
                            if (document.images[i + 17].src != "imgs/flag.svg")
                            { rightclick(i + 17); squares_clicked[i + 17] = 1; }

                        }
                        break;

                    case "left":
                        if (r == 5) {
                            if (document.images[i - 16].src != "imgs/flag.svg")
                            { rightclick(i - 16); squares_clicked[i - 16] = 1; }
                            if (document.images[i + 16].src != "imgs/flag.svg")
                            { rightclick(i + 16); squares_clicked[i + 16] = 1; }
                            if (document.images[i + 1].src != "imgs/flag.svg")
                            { rightclick(i + 1); squares_clicked[i + 1] = 1; }
                            if (document.images[i - 15].src != "imgs/flag.svg")
                            { rightclick(i - 15); squares_clicked[i - 15] = 1; }
                            if (document.images[i + 17].src != "imgs/flag.svg")
                            { rightclick(i + 17); squares_clicked[i + 17] = 1; }

                        }
                        break;

                    case "right":
                        if (r == 5) {
                            if (document.images[i - 16].src != "imgs/flag.svg")
                            { rightclick(i - 16); squares_clicked[i - 16] = 1; }
                            if (document.images[i + 16].src != "imgs/flag.svg")
                            { rightclick(i + 16); squares_clicked[i + 16] = 1; }
                            if (document.images[i - 1].src != "imgs/flag.svg")
                            { rightclick(i - 1); squares_clicked[i - 1] = 1; }
                            if (document.images[i + 15].src != "imgs/flag.svg")
                            { rightclick(i + 15); squares_clicked[i + 15] = 1; }
                            if (document.images[i - 17].src != "imgs/flag.svg")
                            { rightclick(i - 17); squares_clicked[i - 17] = 1; }

                        }
                        break;

                    case "bottom":
                        if (r == 5) {
                            if (document.images[i - 1].src != "imgs/flag.svg")
                            { rightclick(i - 1); squares_clicked[i - 1] = 1; }
                            if (document.images[i - 16].src != "imgs/flag.svg")
                            { rightclick(i - 16); squares_clicked[i - 16] = 1; }
                            if (document.images[i + 1].src != "imgs/flag.svg")
                            { rightclick(i + 1); squares_clicked[i + 1] = 1; }
                            if (document.images[i - 15].src != "imgs/flag.svg")
                            { rightclick(i - 15); squares_clicked[i - 15] = 1; }
                            if (document.images[i - 17].src != "imgs/flag.svg")
                            { rightclick(i - 17); squares_clicked[i - 17] = 1; }

                        }
                        break;

                    case "0":
                        if (r == 8) {
                            if (document.images[i - 1].src != "imgs/flag.svg")
                            { rightclick(i - 1); squares_clicked[i - 1] = 1; }
                            if (document.images[i + 1].src != "imgs/flag.svg")
                            { rightclick(i + 1); squares_clicked[i + 1] = 1; }
                            if (document.images[i + 16].src != "imgs/flag.svg")
                            { rightclick(i + 16); squares_clicked[i + 16] = 1; }
                            if (document.images[i - 16].src != "imgs/flag.svg")
                            { rightclick(i - 16); squares_clicked[i - 16] = 1; }
                            if (document.images[i - 17].src != "imgs/flag.svg")
                            { rightclick(i - 17); squares_clicked[i - 17] = 1; }
                            if (document.images[i + 17].src != "imgs/flag.svg")
                            { rightclick(i + 17); squares_clicked[i + 17] = 1; }
                            if (document.images[i + 15].src != "imgs/flag.svg")
                            { rightclick(i + 15); squares_clicked[i + 15] = 1; }
                            if (document.images[i - 15].src != "imgs/flag.svg")
                            { rightclick(i - 15); squares_clicked[i - 15] = 1; }

                        }
                        break;
                }
            }
        }
    }
}

// Check number of flags being touched by position i
// Check number of tiles touching position i 
function S2(i, e) {
    switch (where[i]) {
        case "topleft":
            if (num_flags_TL(i) == e)
            { clicky(i + 1); clicky(i + 16); clicky(i + 17); }
            else if (num_tiles_TL(i) == e)
                right_click_TL(i);
            break;
        case "topright":
            if (num_flags_TR(i) == e)
            { clicky(i - 1); clicky(i + 16); clicky(i + 15); }
            else if (num_tiles_TR(i) == e)
                right_click_TR(i);
            break;

        case "bottomleft":
            if (num_flags_BL(i) == e)
            { clicky(i + 1); clicky(i - 16); clicky(i - 15); }
            else if (num_tiles_BL(i) == e)
                right_click_BL(i);
            break;

        case "bottomright":
            if (num_flags_BR(i) == e)
            { clicky(i - 1); clicky(i - 16); clicky(i - 17); }
            else if (num_tiles_BR(i) == e)
                right_click_BR(i);
            break;

        case "top":
            if (num_flags_T(i) == e)
            { clicky(i - 1); clicky(i + 1); clicky(i + 15); clicky(i + 16); clicky(i + 17); }
            else if (num_tiles_T(i) == e)
                right_click_T(i);
            break;

        case "left":
            if (num_flags_L(i) == e)
            { clicky(i - 16); clicky(i + 16); clicky(i + 1); clicky(i - 15); clicky(i + 17); }
            else if (num_tiles_L(i) == e)
                right_click_L(i);
            break;

        case "right":
            if (num_flags_R(i) == e)
            { clicky(i - 16); clicky(i + 16); clicky(i - 1); clicky(i + 15); clicky(i - 17); }
            else if (num_tiles_R(i) == e)
                right_click_R(i);
            break;

        case "bottom":
            if (num_flags_B(i) == e)
            { clicky(i - 1); clicky(i - 16); clicky(i + 1); clicky(i - 15); clicky(i - 17); }
            else if (num_tiles_B(i) == e)
                right_click_B(i);
            break;

        case "0":
            if ((num_flags_0(i)) == e)
            { clicky(i - 1); clicky(i + 1); clicky(i + 16); clicky(i - 16); clicky(i - 17); clicky(i + 17); clicky(i + 15); clicky(i - 15); }
            else if ((num_tiles_0(i)) == e)
                right_click_0(i);
            break;
    }
}

// Send the number displayed by position i to S2()
function check_tile(i) {

    if (visib[i] == "1")
        S2(i, 1);
    else if (visib[i] == "2")
        S2(i, 2);
    else if (visib[i] == "3")
        S2(i, 3);
    else if (visib[i] == "4")
        S2(i, 4);
    else if (visib[i] == "5")
        S2(i, 5);
    else if (visib[i] == "6")
        S2(i, 6);
    else if (visib[i] == "7")
        S2(i, 7);
    else if (visib[i] == "8")
        S2(i, 8);
    else { }

}

// S1 calls most of solving functions and actions
function S1(p) {
    var runs = 0;
    while (gameover == false) {
        var updated = numflags;
        for (var i = 0; i < 256; i++) {
            check_tile(i);
            find_ones();
        }

        if (numflags == (num_mines - 1)) {
            var tile1 = 0;
            var tile2 = 0;
            for (var i = 0; i < 256; i++) {
                if ((visib[i] == "tile") && (document.images[i] != "imgs/flag.svg")) {
                    tile1++;
                    tile2 = i;
                }
            }
            if (tile1 == 1)
                rightclick(tile2);
        }


        else if (numflags == num_mines) {
            for (var i = 0; i < 256; i++) {
                clicky(i);
            }
            youwin();
        }

        if (updated == numflags) {
            runs += 1;
            if (runs > 4) {
                alert("Stuck!");
                break;
            }
        }
    }

}

// Find  1-1 pairs next to borders
function find_ones() {
    for (var i = 0; i < 16; i++) {
        if ((visib[i] == "1") && (visib[i + 16] == "1")) {
            if (where[i] == "topleft") { clicky(i + 32); clicky(i + 33); }
            else if (where[i] == "topright") { clicky(i + 31); clicky(i + 32); }
            else { clicky(i + 31); clicky(i + 32); clicky(i + 33); }
        }
    }

    for (var i = 0; i < 241; i = i + 16) {
        if ((visib[i] == "1") && (visib[i + 1] == "1")) {
            if (where[i] == "topleft") { clicky(i + 2); clicky(i + 18); }
            else if (where[i] == "bottomleft") { clicky(i + 2); clicky(i - 14); }
            else { clicky(i - 14); clicky(i + 2); clicky(i + 18); }
        }
    }

    for (var i = 15; i < 256; i = i + 16) {
        if ((visib[i] == "1") && (visib[i - 1] == "1")) {
            if (where[i] == "topright") { clicky(i - 2); clicky(i + 14); }
            else if (where[i] == "bottomright") { clicky(i - 2); clicky(i - 18); }
            else { clicky(i - 18); clicky(i - 2); clicky(i + 14); }
        }
    }

    for (var i = 240; i < 256; i++) {
        if ((visib[i] == "1") && (visib[i - 16] == "1")) {
            if (where[i] == "bottomleft") { clicky(i - 32); clicky(i - 31); }
            else if (where[i] == "bottomright") { clicky(i - 32); clicky(i - 33); }
            else { clicky(i - 33); clicky(i - 32); clicky(i - 31); }
        }
    }
}



// Take guess
function guess_one(i) {
    if (where[i] == "0") {
        clicky(i);
    }
}

// Check if a "middle" tile is surrounded by all unopened tiles.
function touching_all_tiles(i) {
    if(count_tiles(i) == 8)
        return true;
    return false;
}

function guess_a_touching(i) {
    var pos = [i - 1, i + 1, i + 16, i - 16, i - 17, i + 17, i + 15, i - 15];
    i = Math.floor((Math.random() * 8) + 0);
    return pos[i];
}
