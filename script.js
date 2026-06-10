let board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

let moves = 0;

const shuffleBtn = document.getElementById("shuffle");
const movesText = document.getElementById("moves");

const reportConfig = {
  options: {
    grid: {
      showGrandTotals: "off",
      showTotals: "off",
    },
  },

  slice: {
    rows: [{ uniqueName: "row" }],
    measures: [
      { uniqueName: "c1" },
      { uniqueName: "c2" },
      { uniqueName: "c3" },
      { uniqueName: "c4" },
    ],
  },
};

function tile(value) {
  return value;
}

function boardToData() {
  return [
    {
      row: 1,
      c1: tile(board[0]),
      c2: tile(board[1]),
      c3: tile(board[2]),
      c4: tile(board[3]),
    },
    {
      row: 2,
      c1: tile(board[4]),
      c2: tile(board[5]),
      c3: tile(board[6]),
      c4: tile(board[7]),
    },
    {
      row: 3,
      c1: tile(board[8]),
      c2: tile(board[9]),
      c3: tile(board[10]),
      c4: tile(board[11]),
    },
    {
      row: 4,
      c1: tile(board[12]),
      c2: tile(board[13]),
      c3: tile(board[14]),
      c4: tile(board[15]),
    },
  ];
}
function shuffleBoard() {
  for (let i = 0; i < 200; i++) {
    const emptyIndex = board.indexOf(0);

    const neighbors = [];

    if (emptyIndex >= 4) neighbors.push(emptyIndex - 4);
    if (emptyIndex < 12) neighbors.push(emptyIndex + 4);
    if (emptyIndex % 4 !== 0) neighbors.push(emptyIndex - 1);
    if (emptyIndex % 4 !== 3) neighbors.push(emptyIndex + 1);

    const randomNeighbor =
      neighbors[Math.floor(Math.random() * neighbors.length)];

    [board[emptyIndex], board[randomNeighbor]] = [
      board[randomNeighbor],
      board[emptyIndex],
    ];
  }
}

const pivot = new WebDataRocks({
  container: "#pivotContainer",
  toolbar: false,

  cellclick: function (cell) {
    const number = Number(cell.label);

    if (!number) {
      return;
    }

    moveTile(number);
  },

  report: {
    dataSource: {
      data: boardToData(),
    },
    ...reportConfig,
  },
});
shuffleBoard();
updateBoard();

shuffleBtn.addEventListener("click", () => {
  shuffleBoard();

  moves = 0;
  updateMoves();
  updateBoard();
});

function moveTile(number) {
  const tileIndex = board.indexOf(number);
  const emptyIndex = board.indexOf(0);

  const row = Math.floor(tileIndex / 4);
  const col = tileIndex % 4;

  const emptyRow = Math.floor(emptyIndex / 4);
  const emptyCol = emptyIndex % 4;

  const distance = Math.abs(row - emptyRow) + Math.abs(col - emptyCol);

  if (distance === 1) {
    [board[tileIndex], board[emptyIndex]] = [
      board[emptyIndex],
      board[tileIndex],
    ];

    moves++;
    updateMoves();
    updateBoard();

    if (board.join(",") === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0") {
      alert(`Перемога! Ходів: ${moves}`);
    }
  }
}

function updateBoard() {
  pivot.setReport({
    dataSource: {
      data: boardToData(),
    },
    ...reportConfig,
  });
}

function updateMoves() {
  if (movesText) {
    movesText.textContent = `Ходи: ${moves}`;
  }
}
console.log(boardToData());
