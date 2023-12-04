import Cell from "./Cell";
import Modal from "./Modal";
import Row from "./Row";
import "../App.css";
import { useState } from "react";
const PlayerDesk = (props: any) => {
  const [games, setGames] = useState(0);

  const [selectedSize, setSelectedSize] = useState("3");

  const [isX, setIsX] = useState(true);

  const [cells, setCells] = useState(
    Array(props.deskSize * props.deskSize).fill(null)
  );

  const [player, setPlayer] = useState(props.players[0].name);

  const [isFinished, setIsFinished] = useState(false);

  const [visible, setVisible] = useState(false); // modal
  const [phrase, setPhrase] = useState("Нічия");

  const phrases = {
    tie: "Нічия! Спробуйте ще :)",
    win: " переміг. Вітаємо!",
  };

  const Restart = () => {
    setCells(Array(props.deskSize * props.deskSize).fill(null));
    props.setDeskSize(parseInt(selectedSize));
    setIsFinished(false);
    setIsX(true);
    setPlayer(props.players[0].name);
  };

  const ShowModal = () => {
    setVisible(true);
  };
  const ChangePhrase = (result: string) => {
    return result === "win"
      ? setPhrase(`${player} ${phrases.win}`)
      : setPhrase(phrases.tie);
  };

  const ChangeTurn = () => {
    return player == props.players[0].name
      ? setPlayer(props.players[1].name)
      : setPlayer(props.players[0].name);
  };

  const CheckTie = () => {
    if (!cells.includes(null)) {
      setGames((prev) => prev + 1);
      setTimeout(() => ShowModal(), 2000);
      setIsFinished(true);
      ChangePhrase("tie");
    }
  };

  const WinFunction = (array: number[], size: number) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] != null) {
        if (
          isRowWin(array, i, size) ||
          isColumnWin(array, i, size) ||
          isDiagonalWin(array, i, size)
        ) {
          ChangePhrase("win");
          setIsFinished(true);
          setGames((prev) => prev + 1);
          ChangeTurn();
          ChangeWins(player);
          setTimeout(() => ShowModal(), 2000);
          return true;
        }
      }
    }
    return false;
  };
  function isRowWin(array: number[], i: number, size: number) {
    if (
      array[i + 1] === array[i + 2] &&
      array[i] === array[i + 1] &&
      checkRow(i, size) === checkRow(i + 1, size) &&
      checkRow(i, size) === checkRow(i + 2, size)
    ) {
      return true;
    }

    return false;
  }
  function isColumnWin(array: number[], i: number, size: number) {
    if (array[i] === array[i + size] && array[i] === array[i + 2 * size]) {
      return true;
    }
    return false;
  }

  function isDiagonalWin(array: number[], i: number, size: number) {
    if (
      (array[i] == array[i + size + 1] &&
        array[i] == array[i + 2 * size + 2]) ||
      (array[i] == array[i + size - 1] && array[i] == array[i + 2 * size - 2])
    ) {
      return true;
    }
    return false;
  }

  const MakeSign = (position: never, sign: string) => {
    if (!isFinished) {
      if (sign == null) {
        cells[position] = isX ? "X" : "O";
        setCells(cells);
        setIsX(!isX);
        ChangeTurn();
        if (!WinFunction(cells, props.deskSize)) {
          setPlayer((prev: string) => prev);
          CheckTie();
        }
      } else {
        alert("Клітинка зайнята!");
      }
    } else {
      alert("Гра завершена");
    }
  };

  const ChangeWins = (player: string) => {
    let newWins;

    if (player == props.players[0].name) {
      newWins = props.players[0].wins;
      newWins[props.deskSize - 3] = newWins[props.deskSize - 3] + 1;
      props.setPlayer1({ ...props.players[0], wins: [...newWins] });
    } else {
      newWins = props.players[1].wins;
      newWins[props.deskSize - 3] = newWins[props.deskSize - 3] + 1;
      props.setPlayer2({ ...props.players[1], wins: [...newWins] });
    }
  };

  const DrawCells = (size: number) => {
    let rowsArray: number[] = [];
    let cellsArray: number[] = [];
    for (let i = 0; i < size; i++) {
      rowsArray.push(i);
      cellsArray.push(i);
    }
    return [...rowsArray].map((row) => (
      <Row key={row}>
        {[...cellsArray].map((cell) => (
          <Cell
            key={size * row + cell}
            value={cells[size * row + cell]}
            position={size * row + cell}
            onMouseup={MakeSign}
          />
        ))}
      </Row>
    ));
  };

  const checkRow = (element: number, size: number) => {
    return Math.floor(element / size);
  };

  return (
    <div className="Desk">
      <Modal visible={visible} setVisible={setVisible} phrase={phrase} />
      <div className="Options">
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
          <option value={6}>6x6</option>
          <option value={7}>7x7</option>
          <option value={8}>8x8</option>
          <option value={9}>9x9</option>
        </select>
        <button onClick={() => Restart()}> Restart game </button>
        Зіграно ігор: {games}
        <div>Ходить {player}</div>
      </div>
      <div className="Field">{DrawCells(props.deskSize)}</div>
    </div>
  );
};

export default PlayerDesk;
