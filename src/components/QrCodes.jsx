import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QrCodes() {
    const [result, setResult] = useState("");
    const [data, setData] = useState([1707796173901,5874367]);

    useEffect(() => {
        localStorage.clear();
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 5,
                qrbox: { width: 250, height: 250 },
            },
            /* verbose= */ false
        );

        scanner.render(onScanSuccess, onScanError);

        function onScanSuccess(decodedText) {
            setResult(decodedText);
        }

        function onScanError(error) {
            console.error(error);
        }

        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <div>
            <div id="reader"></div>
            {result &&
                (data.filter((f)=>f==result).length > 0 ? <p>Success</p> : <p>Naaah</p>)}
          

        </div>
    );
}
