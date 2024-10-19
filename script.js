var board;
var player_o = "O";
var player_x = "X";
var curr_player = player_o;
var game_over = false;

window.onload = function () {
    set_game();
}
function resetGame() {
    // Reset the board state to empty
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    // Reset all tiles in the board to empty
    let tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].innerText = ""; // Clear the text in each tile
        tiles[i].classList.remove("winner"); // Remove the winner class if any
    }

    // Reset the current player to Player O
    curr_player = playerO;

    // Update the status message
    document.getElementById("status").innerText = "Player O's turn";

    // Reset gameOver flag
    game_over = false;
}

function set_game() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");

            // Add horizontal and vertical borders
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }

            tile.addEventListener("click", set_tile);
            document.getElementById("board").append(tile);
        }
    }
}

function set_tile() {
    if (game_over) {
        return;
    }

    // Get row and column of clicked tile
    let coords = this.id.split("-"); // "0-1" -> ["0", "1"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Check if tile is already filled
    if (board[r][c] !== ' ') {
        return;
    }

    // Update board state
    board[r][c] = curr_player;
    this.innerText = curr_player; // Set the text of the tile to the current player

    // Switch players and update status
    if (curr_player == player_o) {
        curr_player = player_x;
    } else {
        curr_player = player_o;
    }
    document.getElementById("status").innerText = `Player ${curr_player}'s turn`;

    check_winner();
}

function check_winner() {
    // Check rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            end_game(board[r][0]);
            return;
        }
    }

    // Check columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            end_game(board[0][c]);
            return;
        }
    }

    // Check diagonals
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        end_game(board[0][0]);
        return;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        document.getElementById("0-2").classList.add("winner");
        document.getElementById("1-1").classList.add("winner");
        document.getElementById("2-0").classList.add("winner");
        end_game(board[0][2]);
        return;
    }
}

function end_game(winner) {
    document.getElementById("status").innerText = `Player ${winner} wins!`;
    game_over = true;
}
