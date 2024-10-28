
import React from 'react';
import axios from 'axios';
import url from '../helpers/url.tsx';



interface Props {
  id: string
  onShare: () => void
}
const Share = ({ id, onShare }: Props) => {
  const handleShare = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const email = (document.getElementById("mail") as HTMLInputElement).value;
    try {
      await axios.post(url + '/share', {
        mail: email,
        id: id
      });
    } catch (error) {
      console.log(error);
    }
    onShare();
  }
  return (
    <>
      <form>
        <label>Dela med </label>
        <input id="mail" name="mail" type="email"></input>
        <button role="closebtn" type="button" className="closeBtn" onClick={handleShare}>Dela</button>
      </form>
    </>
  )
}
export default Share