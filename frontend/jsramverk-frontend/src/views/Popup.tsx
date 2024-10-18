
interface Props {
    onComment: () => void;
    line: string
}



const Popup = ({ line, onComment }: Props) => {

    return (
        <>
            <form>
                <label>Kommentera på rad {line}</label>
                <input id="comment" name="comment" type="text"></input>
                <button role="closebtn" type="button" className="closeBtn" onClick={onComment}>Kommentera</button>
            </form>
        </>
    )
}
export default Popup