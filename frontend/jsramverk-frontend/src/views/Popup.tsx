
interface Props {
    onClose: () => void;
    data: e

}



const Popup = ({ data, onClose }: Props) => {

    const selection = data.target.value.substring(
        data.target.selectionStart,
        data.target.selectionEnd
    );

    return (
        <>
            <div role="popup" className="popup">Vill du kommentera följande: <span className="comment">{selection}</span>
                <button role="closebtn" type="button" className="closeBtn" onClick={onClose} >Kommentera</button>
            </div>
        </>
    )
}
export default Popup