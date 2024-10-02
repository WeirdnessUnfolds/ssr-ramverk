import { ReactNode } from "react";


interface Props {
    children: ReactNode;
    onClose: () => void;
}

// Creates the alert for updating and saving a document

const Alert = ({ children, onClose }: Props) => {
    return (
        <>
            <div role="alert" className="alert">{children}
                <button role="closebtn" type="button" className="closeBtn" onClick={onClose} >X</button>
            </div>
        </>
    )
}

export default Alert