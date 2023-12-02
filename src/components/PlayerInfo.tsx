import '../App.css';

interface Player {
    player: PlayerInfoProps
}

interface PlayerInfoProps {
    name: string,
    sign: string,
    wins: number
}

const PlayerInfo = ({player} : Player) => {
    return (
        <div className= "PlayerInfo">
            <div>{player.name}</div>

            <div>Знак: {player.sign}</div>

            <div>Перемоги: {player.wins}</div>
        </div>
    )
}

export default PlayerInfo
