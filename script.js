const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
const cellElements = document.querySelectorAll(".cell");
const boardElement = document.getElementById("board");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessageElement = document.getElementById("winningMessage");
const restartBtn = document.getElementById("restartButton");
let isXTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  isXTurn = true;
  cellElements.forEach((cellElem) => {
    cellElem.classList.remove(X_CLASS);
    cellElem.classList.remove(O_CLASS);
    cellElem.removeEventListener("click", handleClick);
    cellElem.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();

  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (checkDraw()) {
    endGame(true);
  } else {
    switchTurn();
    setBoardHoverClass();
  }
}

function endGame(isDraw) {
  if (isDraw) {
    winningMessageTextElement.innerText = "It's a draw!";
  } else {
    winningMessageTextElement.innerText = `${isXTurn ? "X's" : "O's"} Win!`;
  }

  winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurn() {
  isXTurn = !isXTurn;
}

function setBoardHoverClass() {
  boardElement.classList.remove(X_CLASS);
  boardElement.classList.remove(O_CLASS);

  if (isXTurn) boardElement.classList.add(X_CLASS);
  else boardElement.classList.add(O_CLASS);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) =>
    combination.every((position) =>
      cellElements[position].classList.contains(currentClass)
    )
  );
}

function checkDraw() {
  return [...cellElements].every(
    (cell) =>
      cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  );
}
