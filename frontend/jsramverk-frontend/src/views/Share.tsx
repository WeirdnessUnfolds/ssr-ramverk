
import React from 'react';




const Share = () => {
    const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const email = (document.getElementById("mail") as HTMLInputElement).value;

    }
    return (
        <>
            <form>
                <label>Dela med</label>
                <input id="mail" name="mail" type="email"></input>
                <button role="closebtn" type="button" className="closeBtn" onClick={handleShare}>Dela</button>
            </form>
        </>
    )
}
export default Share