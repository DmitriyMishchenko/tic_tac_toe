import Cell from "./Cell"
import Modal from './Modal';
import "../App.css"
import { useState } from "react"
const PlayerDesk = (props: any) => {

    const [currentSign, setCurrentSign] = useState("X")
    const [restart, setRestart] = useState(0)

    const [X, setX] = useState([])
    const [O, setO] = useState([])

    const [player, setPlayer] = useState(props.players[0].name)

    const [games, setGames] = useState(0)

    const phrases = {
        tie: "Нічия! Спробуйте ще :)",
        win: " переміг. Вітаємо!"
    }

    const [isFinished, setIsFinished] = useState(false)

    const [visible, setVisible] = useState(false)
    const [phrase, setPhrase] = useState("Нічия")

    const Restart = () => {
       setRestart(prev => prev + 1);
       setIsFinished(false);
       setX([]);
       setO([]);
       setCurrentSign("X");
       setPlayer(props.players[0].name);
    }

    const ShowPositions = () => {
        console.log(`X:`+ X);
        console.log(`O:`+ O);
    }
    
    const ShowModal = () => {
        setVisible(true);
    }
    const ChangePhrase = (result : string) => {
        return result === "win" ? setPhrase(`${player} ${phrases.win}`) : setPhrase(phrases.tie);
    }


    const ChangeSign = () => {
        currentSign == "X" 
        ?
        setCurrentSign("O") 
        :
        setCurrentSign("X")
        
    }

    const ChangeTurn = () => {
        return player == props.players[0].name ? setPlayer(props.players[1].name) : setPlayer(props.players[0].name)
    }

    const CheckTie = () => {
        if ((X.length + O.length) === 8) {
            setGames(prev => prev + 1);
            setTimeout(() => ShowModal(), 2000)
            setIsFinished(true);
            ChangePhrase("tie");
        }
    }

    const CheckWin = () => {
        // let arrayX = [...X];
        // let arrayO = [...O];
        const size = 3;
        ShowPositions();
        return WinFunction(X, size) || WinFunction(O, size);
    }

    const WinFunction = (array : number[], size : number) => {
        for(let i = 0 ; i < array.length; i++){
            if
            ((array.includes(array[i]+size as never) && array.includes(array[i]+2*size as never))
            ||
            (array.includes(array[i]+size as never) && array.includes(array[i]+2*size as never))
            ||
            (array.includes(array[i]+size+1 as never) && array.includes(array[i]+2*size+2 as never))
            ||
            (array.includes(array[i]+size-1 as never) && array.includes(array[i]+2*size-2 as never))
            )
            {
                ChangePhrase("win");
                setIsFinished(true);
                setGames(prev => prev + 1);
                            ChangeTurn();
                ChangeWins(player);
                setTimeout(()=> ShowModal(), 2000)
                return true;
            }
    }}

    const MakeSign = (position : never, sign : string, setSign : Function, newSign : string = currentSign ) => {
        console.log("CurrentSign: " + newSign);
        if (!isFinished){
        if (sign == ""){
            ChangeTurn();
            setSign(newSign);
            SaveChoice(position, newSign);
           if (!CheckWin()) {
            setPlayer((prev : string) => prev)
            ChangeSign();
            ShowPositions();
            CheckTie();
           }

        }
        else{
            alert("Клітинка зайнята!")
        }
    }
    else{
        alert("Гра завершена")
    }
    }

    const SaveChoice = (position : never, newSign : string) => {
        newSign == "X" ? setX(prev => [...prev, position]) : setO(prev => [...prev, position]);
    }

    const ChangeWins = (player : string) => {
        player == props.players[0].name ? props.setPlayer1({...props.players[0], wins: props.players[0].wins++}) : props.setPlayer2({...props.players[1], wins: props.players[1].wins++})
    }

    const drawCells = (size : number) =>{
        let field : number[] = []
        for ( let i = 0; i < size; i++){
            field.push(i);
        }
        return field.map(cell =>  <Cell restart = {restart} position = {cell+1} onMouseup = {MakeSign}/>);
    }
    

    return (
        <div className = "Desk">
            <Modal visible = {visible} setVisible={setVisible} phrase={phrase}/>
            <div className="Options">
                <select>
                    <option>3x3</option>
                    <option>4x4</option>
                    <option>5x5</option>
                    <option>6x6</option>
                    <option>7x7</option>
                    <option>8x8</option>
                    <option>9x9</option>
                </select>
                <button onClick = {() => Restart()}> Restart game </button>
                    Зіграно ігор: {games}
                <div>Ходить {player}</div>
            </div>
            <div className = "Field">
                {drawCells(9)} 
            </div>
            
        </div>

    )
}


export default PlayerDesk
