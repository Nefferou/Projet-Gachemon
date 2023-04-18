import React, { useState } from "react";
import "../Scss/App.scss";

import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { Button } from "@mui/material";
import Link from "@mui/material/Link";

import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailExists, setEmailExists] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const checkEmailExists = () => {
        const jsonBody = {
            email: email
        }
        axios.post(`https://gachemon.osc-fr1.scalingo.io/api/user/email`, JSON.stringify(jsonBody),{
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                    setEmailExists(false);
                    setErrorMessage(null);
            })
            .catch(error =>{
                setEmailExists(true);
                setErrorMessage("This email address is already registered.");
            });
    }

    const handleRegister = () => {
        if (!emailExists) {
            const data = {
                username: username,
                email:email,
                password: password
            }
    
            axios.post('https://gachemon.osc-fr1.scalingo.io/api/user',JSON.stringify(data),{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    navigate("/login");
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <div className="center">
        <Stack id="register" spacing={2}>
            <ThemeProvider theme={theme}>
                <h1>Register</h1>
                <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} onBlur={checkEmailExists}/>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} type="password" />
                <TextField id="outlined-basic" label="Confirm password" variant="outlined" type="password" />
                <Button variant="contained" onClick={handleRegister}>Create Account</Button>
                <Link href="/login">Login</Link>
            </ThemeProvider>
        </Stack>
        </div>
    );
}

export default Register;