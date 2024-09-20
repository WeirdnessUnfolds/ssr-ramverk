interface Props {
    onClose: () => void;
}

const Alert = ({ onClose }: Props) => {
    return (
        <>
            <div className="alert">Nu är dokumentet sparat
                <button type="button" className="closeBtn" onClick={onClose} >X</button>
            </div>
        </>
    )
}

export default Alert