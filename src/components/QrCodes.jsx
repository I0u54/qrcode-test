import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

export default function QrCodes() {
    const [result, setResult] = useState("");
    const [data, setData] = useState([1707865158240,1707879217746]);
   

    useEffect(() => {
       
        localStorage.clear();
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 5,
                qrbox: { width: 250, height: 250 },
            },
            false
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
        <div style={{width:"80%",margin:"auto",marginTop:"20px"}}>
            <div id="reader" style={{borderRadius:"10px"}}></div>
            {result &&
                (data.filter((f)=>f==result).length > 0 ?<Alert status='success'>
                <AlertIcon />
                <AlertTitle>Good</AlertTitle>
                <AlertDescription>Your Qr Code is valid.</AlertDescription>
              </Alert> :<Alert status='error'>
                <AlertIcon />
                <AlertTitle>Invalid</AlertTitle>
                <AlertDescription>Your Qr Code is invalid.</AlertDescription>
              </Alert>)}
          

        </div>
    );
}
