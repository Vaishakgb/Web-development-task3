document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.getElementById("restart-btn");

    let currentPlayer = "X";
    let gameActive = true;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cellIndex = e.target.dataset.cellIndex;
        if (boardState[cellIndex] !== "" || !gameActive) return;

        boardState[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            gameActive = false;
            alert(`Player ${currentPlayer} wins!`);
            return;
        }
        if (checkDraw()) {
            gameActive = false;
            alert("It's a draw!");
            return;
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const restartGame = () => {
        boardState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        cells.forEach(cell => {
            cell.textContent = "";
        });
    };

    const checkWin = () => {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    };

    const checkDraw = () => {
        return boardState.every(cell => {
            return cell !== "";
        });
    };

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    restartBtn.addEventListener("click", restartGame);
});
