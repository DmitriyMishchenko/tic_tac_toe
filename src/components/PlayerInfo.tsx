import { ReactNode } from "react";
import "../App.css";

interface App {
  deskSize: number;
  player: PlayerInfoProps;
}

interface PlayerInfoProps {
  name: string;
  sign: string;
  wins: number[];
}

const PlayerInfo = ({ player, deskSize }: App) => {
  return (
    <div className="PlayerInfo">
      <div>{player.name}</div>

      <div>Знак: {player.sign}</div>

      <div>Перемоги: {player.wins[deskSize - 3]}</div>
    </div>
  );
};

export default PlayerInfo;
