import "./App.css";
import PlayerInfo from "./components/PlayerInfo";
import PlayerDesk from "./components/PlayerDesk";
import { useState } from "react";
const App = () => {
  const [deskSize, setDeskSize] = useState(3);

  const [player1, setPlayer1] = useState({
    name: "Гравець 1",
    sign: "X",
    wins: Array(7).fill(0),
  });
  const [player2, setPlayer2] = useState({
    name: "Гравець 2",
    sign: "O",
    wins: Array(7).fill(0),
  });

  return (
    <div className="App">
      <header className="App-header">
        <PlayerInfo deskSize={deskSize} player={player1} />
        <PlayerDesk
          deskSize={deskSize}
          setDeskSize={setDeskSize}
          players={[player1, player2]}
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
        />
        <PlayerInfo deskSize={deskSize} player={player2} />
      </header>
    </div>
  );
};

export default App;
