import "../App.css"
import { useEffect, useState } from "react"
const Cell = (props : any) => {

    const [sign, setSign] = useState("")
    
    useEffect(() => {
        setSign("")
    }, [props.restart])

    return (
        <div className="Cell" onMouseDown={() =>props.onMouseup(props.position, sign, setSign)}>
            {sign}
        </div>
    )
}

export default Cell
