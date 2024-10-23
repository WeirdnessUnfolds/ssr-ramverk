
import React from 'react';
import axios from 'axios';
import url from '../helpers/url.tsx';

const Share = () => {
  const handleShare = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const email = (document.getElementById("mail") as HTMLInputElement).value;
    try {
      const mailSend = await axios.post(url + '/sendmail', {
        mail: email
      });
      console.log("A mail has been sent!");
    } catch (error) {
      console.log(error);
    }
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