import './App.css';
import PlayerInfo from './components/PlayerInfo';
import PlayerDesk from './components/PlayerDesk';
import { useState } from 'react';
const App = () => {

  const [player1, setPlayer1] = useState({
    name: "Гравець 1",
    sign: "X",
    wins: 0
  })
  const [player2, setPlayer2] = useState({
    name: "Гравець 2",
    sign: "O",
    wins: 0
  })

  return (
    <div className="App">
      <header className="App-header">
        <PlayerInfo player = {player1}/>
        <PlayerDesk players = {[player1, player2]} setPlayer1 = {setPlayer1} setPlayer2 = {setPlayer2}/>
        <PlayerInfo player = {player2}/>
      </header>
    </div>
  );
}

export default App;
