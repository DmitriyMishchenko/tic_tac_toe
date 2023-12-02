import "../modal.css"

interface ModalProps {
    visible : boolean,
    setVisible : Function,
    phrase: string
}

const Modal = ({visible, setVisible, phrase} : ModalProps) => {

    const rootClasses = ["modal"];
    if(visible === true){
        rootClasses.push("-active")
    }

    const closeModal = () => {
        setVisible(false);
    }

    return (
        <div className={rootClasses.join("")} onClick = {() => setVisible(false)}>
            <div className='modal-outer'>
                <div className='modal-frame'>
                    <div className="modal-row">
                        <div className='modal-title'> {phrase} </div>
                    </div>
                    <button onClick={closeModal} className="modal-input">OK</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
