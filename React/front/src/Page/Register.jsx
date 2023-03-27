import React, { useState } from "react";
import "../Scss/style.scss";

import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { Button } from "@mui/material";

import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
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
                console.log(response.data);
                console.log(data);
            })
            .catch(error => console.error(error));
    }
    return (
        <div className="center">
        <Stack id="register" spacing={2}>
            <ThemeProvider theme={theme}>
                <h1>Register</h1>
                <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} type="password" />
                <TextField id="outlined-basic" label="Confirm password" variant="outlined" type="password" />
            <Button variant="contained" onClick={handleRegister}>Create Account</Button>
            </ThemeProvider>
        </Stack>
        </div>
    );
}

export default Register;