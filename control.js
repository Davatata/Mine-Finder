function newGame() {
    clock = 0;
    numflags = 0;
    num_tiles = 0;
    gameover = false;
    clicked = false;
    for (var i = 0; i < num_rows * num_cols; i++) {
        visib[i] = "tile";
        board[i] = "0";
        document.images[i].src = "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/" + visib[i] + ".svg";
    }

    //set up 40 mines
    for (var i = 0; i < num_mines; i++) {
        board[i] = "mine";
    }

    //randomize the mines
    for (var i = 0; i < num_rows * num_cols; i++) {
        var rand = Math.floor(Math.random() * (i + 1));
        var temp = board[rand];
        board[rand] = board[i];
        board[i] = temp;
    }

    var start_time = new Date();
    begin = start_time.getTime();
    myTimer = setInterval(function () { updateTimer() }, 1000);

    //call to set up mines
    setboard();

    document.getElementById("theflags").value = numflags + "/" + num_mines;
}

//sets up the numbers according to mine placement
function setboard() {
    for (var i = 0; i < num_rows * num_cols; i++) where[i] = board[i];
    where[0] = "topleft"; where[15] = "topright"; where[240] = "bottomleft"; where[255] = "bottomright";
    for (var i = 1; i < 15; i++) where[i] = "top";
    for (var i = 16; i < 240; i += 16) where[i] = "left";
    for (var i = 31; i < 255; i += 16) where[i] = "right";
    for (var i = 241; i < 255; i++) where[i] = "bottom";

    for (var i = 0; i < num_rows * num_cols; i++) {
        if (board[i] == "mine") continue;
        switch (where[i]) {
            case "topleft": board[i] = check(i + 1) + check(i + 16) + check(i + 17); break;
            case "topright": board[i] = check(i - 1) + check(i + 16) + check(i + 15); break;
            case "bottomleft": board[i] = check(i + 1) + check(i - 16) + check(i - 15); break;
            case "bottomright": board[i] = check(i - 1) + check(i - 16) + check(i - 17); break;
            case "top": board[i] = check(i - 1) + check(i + 1) + check(i + 15) + check(i + 16) + check(i + 17); break;
            case "left": board[i] = check(i - 16) + check(i + 16) + check(i + 1) + check(i - 15) + check(i + 17); break;
            case "right": board[i] = check(i - 16) + check(i + 16) + check(i - 1) + check(i + 15) + check(i - 17); break;
            case "bottom": board[i] = check(i - 1) + check(i - 16) + check(i + 1) + check(i - 15) + check(i - 17); break;
            case "0": board[i] = check(i - 1) + check(i + 1) + check(i + 16) + check(i - 16) + check(i - 17) + check(i + 17) + check(i + 15) + check(i - 15); break;

        }
    }
}

//if cell contains 0, reveal all neighbors until numbers are reached
function reveal(n) {

    if (board[n] == 0 && (document.images[n].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/tile.svg")) {
        document.images[n].src = "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/" + board[n] + ".svg"; visib[n] = board[n];
        revealer(n);

    }

    else if (board[n] == 0 && (document.images[n].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg")) {
        numflags--;
        document.images[n].src = "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/" + board[n] + ".svg"; visib[n] = board[n];
        document.getElementById("theflags").value = numflags + "/" + num_mines;
        revealer(n);

    }
    else if (board[n] != "mine" && (document.images[n].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg")) {
        numflags--;
        document.images[n].src = "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/" + board[n] + ".svg"; visib[n] = board[n];
        document.getElementById("theflags").value = numflags + "/" + num_mines;

    }



    else {
        document.images[n].src = "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/" + board[n] + ".svg"; visib[n] = board[n];
    }

}

function revealer(i) {
    switch (where[i]) {
        case "topleft": reveal(i + 1); reveal(i + 16); reveal(i + 17); break;
        case "topright": reveal(i - 1); reveal(i + 16); reveal(i + 15); break;
        case "bottomleft": reveal(i + 1); reveal(i - 16); reveal(i - 15); break;
        case "bottomright": reveal(i - 1); reveal(i - 16); reveal(i - 17); break;
        case "top": reveal(i - 1); reveal(i + 1); reveal(i + 15); reveal(i + 16); reveal(i + 17); break;
        case "left": reveal(i - 16); reveal(i + 16); reveal(i + 1); reveal(i - 15); reveal(i + 17); break;
        case "right": reveal(i - 16); reveal(i + 16); reveal(i - 1); reveal(i + 15); reveal(i - 17); break;
        case "bottom": reveal(i - 1); reveal(i - 16); reveal(i + 1); reveal(i - 15); reveal(i - 17); break;
        case "0": reveal(i - 1); reveal(i + 1); reveal(i + 16); reveal(i - 16); reveal(i - 17); reveal(i + 17); reveal(i + 15); reveal(i - 15); break;
        case "mine": break;

    }
}

//handles left clicks
function clicky(n) {
    clicked = true;
    if (gameover == true) { }
    else if (document.images[n].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg")
        return;

    else if (board[n] == "mine") {
        for (var i = 0; i < num_rows * num_cols; i++) {
            if (document.images[i].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg" && board[i] != "mine")
                board[i] = "xflag";

            document.images[i].src = "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/" + board[i] + ".svg";
        }
        youlose();
        return -1;
    }

    else if (board[n] == 0)
    { reveal(n); num_tiles++; return visib[n]; }

    else { document.images[n].src = "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/" + board[n] + ".svg"; num_tiles++; visib[n] = board[n]; return visib[n]; }


}

//handle right click to place or remove flags, update flag counter
function rightclick(n) {
    if (document.images[n].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") {
        document.images[n].src = "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/tile.svg";
        numflags--;
    }

    else if (document.images[n].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/tile.svg") {
        document.images[n].src = "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg";
        numflags++;
    }

    document.getElementById("theflags").value = numflags + "/" + num_mines;
    if ((num_tiles == (256 - num_mines)) && (numflags == num_mines)) youwin();
    return false;
}

//creates a num_cols*num_rows table using HTML
function maketable() {
    document.write('<table border="0" cellspacing="0" cellpadding="0">');

    var n = 0;
    for (var i = 0; i < num_rows; i++) {
        document.write('<tr>');

        for (var j = 0; j < num_cols; j++) {
            document.write('<td><a HREF="" onClick="clicky(' + n + '); return false;" onContextMenu="return rightclick(' + n + '); return false;"><img SRC="http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/tile.svg" WIDTH="24" HEIGHT="24"></a></td>');
            n++;
        }

        document.write('</tr>');
    }

    document.write('</table>');
}

//creates the form to display #of flags and time passed
function controlform() {
    document.write(
        '<br/>              \
        <form NAME="f">     \
        <input TYPE="button" VALUE="New Game" onclick ="newGame()"; onContextMenu="return false;" >&nbsp;&nbsp;&nbsp;&nbsp; \
        Flags: <input TYPE="text" ID="theflags" NAME="flags" SIZE="6" readonly onContextMenu="return false;">&nbsp;&nbsp;&nbsp;&nbsp; \
        Time:  <input TYPE="text" ID="thetime"  NAME="time"  SIZE="6" VALUE="" readonly onContextMenu="return false;">&nbsp;&nbsp;&nbsp;&nbsp; \
        <br><br> \
        <input id = "solve_button" TYPE="button" VALUE="Solve" onclick ="solve()"; onContextMenu="return false;" >&nbsp;&nbsp;&nbsp;&nbsp; \
        <div id="solving" style="display:none; width=100%; height=auto;">Solving</div>        \
        <input TYPE="button" VALUE="# Mines" onclick ="change_num_mines()"; onContextMenu="return false;" >'
        );
}

function toggle_solve_button() {
    if ($('#solve_button').is(':visible')) {
        $("#solve_button").hide();
        $("#solving").show();
    }
    else {
        $("#solve_button").show();
        $("#solving").hide();
    }
}

//called every second after game starts and displayed in Time text field
function updateTimer() {
    var t_secs = "";
    var t_min = "";
    var curTime = new Date();

    var secs = (curTime.getTime() - begin) / 1000;
    secs = secs.toFixed(0);

    var min = 0;
    while (secs >= 60) {
        min++;
        secs = secs - 60;
    }

    if (min < 10)
        t_min = "0" + min.toString();
    else
        t_min = min.toString();
    if (secs < 10)
        t_secs = "0" + secs.toString();
    else
        t_secs = secs.toString();
    document.getElementById("thetime").value = t_min + ":" + t_secs;
}


//check if cell has mine
function check(i) {
    if (board[i] == "mine") return 1;
    else return 0;
}

// These functions return number of tiles/ number of flags touched by position i and perform right click on i
function num_tiles_TL(i) {
    var x = 0;
    if ((visib[i + 1] == "tile")) { x++; }
    if ((visib[i + 16] == "tile")) { x++; }
    if ((visib[i + 17] == "tile")) { x++; }
    return x;
}
function num_flags_TL(i) {
    var x = 0;
    if (document.images[i + 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 17].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    return x;
}
function right_click_TL(i) {
    if (document.images[i + 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 1); }//check_tile(i + 1); }
    if (document.images[i + 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 16); }//check_tile(i + 16); }
    if (document.images[i + 17].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 17); }//check_tile(i + 17); }
}

function num_tiles_TR(i) {
    var x = 0;
    if ((visib[i - 1] == "tile")) { x++; }
    if ((visib[i + 16] == "tile")) { x++; }
    if ((visib[i + 15] == "tile")) { x++; }
    return x;
}
function num_flags_TR(i) {
    var x = 0;
    if (document.images[i - 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 15].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    return x;
}
function right_click_TR(i) {
    if (document.images[i - 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 1); }//check_tile(i - 1); }
    if (document.images[i + 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 16); }//check_tile(i + 16); }
    if (document.images[i + 15].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 15); }//check_tile(i + 15); }
}

function num_tiles_BL(i) {
    var x = 0;
    if ((visib[i + 1] == "tile")) { x++; }
    if ((visib[i - 16] == "tile")) { x++; }
    if ((visib[i - 15] == "tile")) { x++; }
    return x;
}
function num_flags_BL(i) {
    var x = 0;
    if (document.images[i + 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 15].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    return x;
}
function right_click_BL(i) {
    if (document.images[i + 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 1); }//check_tile(i + 1); }
    if (document.images[i - 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 16); }//check_tile(i - 16); }
    if (document.images[i - 15].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 15); }//check_tile(i - 15); }
}

function num_tiles_BR(i) {
    var x = 0;
    if ((visib[i - 1] == "tile")) { x++; }
    if ((visib[i - 16] == "tile")) { x++; }
    if ((visib[i - 17] == "tile")) { x++; }

    return x;
}
function num_flags_BR(i) {
    var x = 0;
    if (document.images[i - 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 17].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }

    return x;
}
function right_click_BR(i) {
    if (document.images[i - 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 1); }//check_tile(i - 1); }
    if (document.images[i - 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 16); }//check_tile(i - 16); }
    if (document.images[i - 17].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 17); }//check_tile(i - 17); }
}

function num_tiles_T(i) {
    var x = 0;
    if ((visib[i - 1] == "tile")) { x++; }
    if ((visib[i + 1] == "tile")) { x++; }
    if ((visib[i + 15] == "tile")) { x++; }
    if ((visib[i + 16] == "tile")) { x++; }
    if ((visib[i + 17] == "tile")) { x++; }
    return x;
}
function num_flags_T(i) {
    var x = 0;
    if (document.images[i - 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 15].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 17].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    return x;
}
function right_click_T(i) {
    if (document.images[i - 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 1); }//check_tile(i - 1); }
    if (document.images[i + 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 1); }//check_tile(i + 1); }
    if (document.images[i + 15].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 15); }//check_tile(i + 15); }
    if (document.images[i + 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 16); }//check_tile(i + 16); }
    if (document.images[i + 17].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 17); }//check_tile(i + 17); }
}

function num_tiles_L(i) {
    var x = 0;
    if ((visib[i - 16] == "tile")) { x++; }
    if ((visib[i + 16] == "tile")) { x++; }
    if ((visib[i + 1] == "tile")) { x++; }
    if ((visib[i - 15] == "tile")) { x++; }
    if ((visib[i + 17] == "tile")) { x++; }
    return x;
}
function num_flags_L(i) {
    var x = 0;
    if (document.images[i - 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 15].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 17].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    return x;
}
function right_click_L(i) {
    if (document.images[i - 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 16); }//check_tile(i - 16); }
    if (document.images[i + 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 16); }//check_tile(i + 16); }
    if (document.images[i + 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 1); }//check_tile(i + 1); }
    if (document.images[i - 15].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 15); }//check_tile(i - 15); }
    if (document.images[i + 17].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 17); }//check_tile(i + 17); }
}

function num_tiles_R(i) {
    var x = 0;
    if ((visib[i - 16] == "tile")) { x++; }
    if ((visib[i + 16] == "tile")) { x++; }
    if ((visib[i - 1] == "tile")) { x++; }
    if ((visib[i + 15] == "tile")) { x++; }
    if ((visib[i - 17] == "tile")) { x++; }
    return x;
}
function num_flags_R(i) {
    var x = 0;
    if (document.images[i - 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 15].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 17].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    return x;
}
function right_click_R(i) {
    if (document.images[i - 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 16); }//check_tile(i - 16); }
    if (document.images[i + 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 16); }//check_tile(i + 16); }
    if (document.images[i - 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 1); }//check_tile(i - 1); }
    if (document.images[i + 15].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 15); }//check_tile(i + 15); }
    if (document.images[i - 17].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 17); }//check_tile(i - 17); }
}

function num_tiles_B(i) {
    var x = 0;
    if ((visib[i - 1] == "tile")) { x++; }
    if ((visib[i - 16] == "tile")) { x++; }
    if ((visib[i + 1] == "tile")) { x++; }
    if ((visib[i - 15] == "tile")) { x++; }
    if ((visib[i - 17] == "tile")) { x++; }
    return x;
}
function num_flags_B(i) {
    var x = 0;
    if (document.images[i - 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 15].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 17].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    return x;
}
function right_click_B(i) {
    if (document.images[i - 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 1); }//check_tile(i - 1); }
    if (document.images[i - 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 16); }//check_tile(i - 16); }
    if (document.images[i + 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 1); }//check_tile(i + 1); }
    if (document.images[i - 15].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 15); }//check_tile(i - 15); }
    if (document.images[i - 17].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 17); }//check_tile(i - 17); }
}

function num_tiles_0(i) {
    var x = 0;
    if ((visib[i - 1]  == "tile")) { x++; }
    if ((visib[i + 1]  == "tile")) { x++; }
    if ((visib[i + 16] == "tile")) { x++; }
    if ((visib[i - 16] == "tile")) { x++; }
    if ((visib[i - 17] == "tile")) { x++; }
    if ((visib[i + 17] == "tile")) { x++; }
    if ((visib[i + 15] == "tile")) { x++; }
    if ((visib[i - 15] == "tile")) { x++; }

    return x;
}
function num_flags_0(i) {
    var x = 0;
    if (document.images[i - 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 1].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 16].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 17].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 17].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i + 15].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    if (document.images[i - 15].src == "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { x++; }
    return x;
}
function right_click_0(i) {
    if (document.images[i - 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 1); }//check_tile(i - 1); }
    if (document.images[i + 1].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 1); }//check_tile(i + 1); }
    if (document.images[i - 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 16); }//check_tile(i + 16); }
    if (document.images[i + 16].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 16); }//check_tile(i - 16); }
    if (document.images[i - 17].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 17); }//check_tile(i - 17); }
    if (document.images[i + 17].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 17); }//check_tile(i + 17); }
    if (document.images[i - 15].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i - 15); }//check_tile(i + 15); }
    if (document.images[i + 15].src != "http://googledrive.com/host/0B6xHs0uhsCQzflprNjFlc1l3VXlQTmpCV2JBTWw3bHZ3dlRoMnFoX3ZhUW5SNnI0cUtTSFk/flag.svg") { rightclick(i + 15); }//check_tile(i - 15); }
}

// Update number of mines on board, start new game
function change_num_mines() {
    var num = prompt("Enter number between 1 and 100", num_mines);
    if (!(num < 1) && !(num > 100)) {
        num_mines = num;
        newGame();
    }

}

// Return number of tiles touching position i
function count_tiles(i) {
    switch (where[i]) {
        case "topleft":
            var x = num_tiles_TL(i);
            return x;
            break;
        case "topright":
            var x = num_tiles_TR(i);
            return x;
            break;

        case "bottomleft":
            var x = num_tiles_BL(i);
            return x;
            break;

        case "bottomright":
            var x = num_tiles_BR(i);
            return x;
            break;

        case "top":
            var x = num_tiles_T(i);
            return x;
            break;

        case "left":
            var x = num_tiles_L(i);
            return x;
            break;

        case "right":
            var x = num_tiles_R(i);
            return x;
            break;

        case "bottom":
            var x = num_tiles_B(i);
            return x;
            break;

        case "0":
            var x = num_tiles_0(i);
            return x;
            break;
    }
}

function touching_number(i) {
    switch (where[i]) {
        case "topleft":
            var x = num_tiles_TL(i);
            return x != 3;
            break;
        case "topright":
            var x = num_tiles_TR(i);
            return x != 3;
            break;

        case "bottomleft":
            var x = num_tiles_BL(i);
            return x != 3;
            break;

        case "bottomright":
            var x = num_tiles_BR(i);
            return x != 3;
            break;

        case "top":
            var x = num_tiles_T(i);
            return x != 5;
            break;

        case "left":
            var x = num_tiles_L(i);
            return x != 5;
            break;

        case "right":
            var x = num_tiles_R(i);
            return x != 5;
            break;

        case "bottom":
            var x = num_tiles_B(i);
            return x != 5;
            break;

        case "0":
            var x = num_tiles_0(i);
            return x != 8;
            break;
    }
}