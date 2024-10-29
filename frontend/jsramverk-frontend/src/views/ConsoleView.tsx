import { useState } from 'react'
import axios from 'axios'

interface Props {
    inputcontent: string
}

function ConsoleView({ inputcontent }: Props) {
    const [codeResult, setCodeResult] = useState("");

    const runCode = async () => {
        setCodeResult("Running code...")
        var data = {
            code: btoa(inputcontent)
        };

        await axios.post(`https://execjs.emilfolino.se/code`,
            JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            let decodedOutput = atob(res.data.data);
            setCodeResult(decodedOutput)
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="consoleColumn">
            <h2>Konsol</h2>
            <div className="console">{codeResult}</div>
            <button className='runbtn' type="button" onClick={runCode}>Kör kod</button></div>
    )
}

export default ConsoleView