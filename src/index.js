(()=>{
  let board = new Array(9).fill().map(() => null);
  let PLAYER = "X";
  const handleClick = e => {
    board = makePlay(board, parseInt(e.target.id));
    drawBoard(board);
  };

  const checkForWinners = board => {
    const verify = x => y => x === y;
    const isAnX = verify("X");
    const isAnO = verify("O");
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ].filter(
      row => row.every(x => isAnO(board[x])) || row.every(x => isAnX(board[x]))
    );
  };
  const drawBoard = brd => {
    const container = document.getElementsByClassName("board")[0];
    const result = checkForWinners(board)[0] || null;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    brd.map((sq, indx) => {
      const newSq = document.createElement("div");
      newSq.setAttribute("id", indx);
      newSq.addEventListener("click", handleClick);
      newSq.innerHTML = sq || "&nbsp;";
      if (result && result.includes(indx)) {
        newSq.className = "winBx";
      }
      container.appendChild(newSq);
    });
  };

  const togglePlayer = () => {
    PLAYER = PLAYER === "X" ? "O" : "X";
  };
  const checkPlay = (board, spc) => !board[spc];
  const makePlay = (board, spc) => {
    if (checkPlay(board, spc)) {
      togglePlayer();
      return Object.assign([], board, { [spc]: PLAYER });
    } else {
      return board;
    }
  };
  drawBoard(board);
})();
