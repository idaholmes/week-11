document.addEventListener("DOMContentLoaded", function () {
  let currentPlayer = "X";
  let cells = document.querySelectorAll(".cell");
  let turnDisplay = document.getElementById("turn");
  let restartBtn = document.getElementById("restartBtn");
  let winnerAlert = document.getElementById("winnerAlert");

  const checkWinner = () => {
    // possible winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      // loop over lines
      const [a, b, c] = line;
      // check each square / line, and see if any random 3 cells in a row have matching content; X or O and return X or 0 (the winner)
      if (
        cells[a].innerHTML &&
        cells[a].innerHTML === cells[b].innerHTML &&
        cells[a].innerHTML === cells[c].innerHTML
      ) {
        return cells[a].innerHTML;
      }
    }

    if ([...cells].every((cell) => cell.innerHTML)) {
      // return draw if nobody wins. The .every() array method checks if all the cells are filled.
      return "draw";
    }

    return null;
  };

  const handleClick = (event) => {
    // check if target is empty before running code
    if (!event.target.innerHTML) {
      event.target.innerHTML = currentPlayer;
      // run check winner function
      let winner = checkWinner();
      if (winner) {
        if (winner === "draw") {
          // if check winner func returns a draw then display it's a draw
          winnerAlert.textContent = "It's a draw!";
        } else {
          // return player name; X or O in this situation
          winnerAlert.textContent = `Player ${winner} wins!`;
        }
        // display alert box
        winnerAlert.style.display = "block";
        // set cell content back to empty
        turnDisplay.textContent = "";
        cells.forEach((cell) => cell.removeEventListener("click", handleClick));
      } else {
        // assuming game is still running, define currentPlayer
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnDisplay.textContent = `${currentPlayer}'s Turn`;
      }
    }
  };

  const restartGame = () => {
    // loop over cells with a .forEach
    cells.forEach((cell) => {
      // clear data in each cell
      cell.innerHTML = "";
      // add click handler
      cell.addEventListener("click", handleClick);
    });
    currentPlayer = "X";
    turnDisplay.textContent = `${currentPlayer}'s Turn`;
    winnerAlert.style.display = "none";
  };

  // add click events to each cell
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
  // restart game
  restartBtn.addEventListener("click", restartGame);
});
