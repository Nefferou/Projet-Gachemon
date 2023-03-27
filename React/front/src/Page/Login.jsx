import React, { useState } from "react";
import "../Scss/style.scss";

import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import { Button } from "@material-ui/core";
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const data = {
            username: username,
            password: password
        }
        axios.get('https://gachemon.osc-fr1.scalingo.io/api/user',JSON.stringify(data))
            .then(response => {
                console.log(response.data);
                console.log(data);
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="center">
        <Stack id="login" spacing={2}>
            <ThemeProvider theme={theme}>
                <h1>Login</h1>
                <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
                <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                <Button onClick={handleLogin}> Login </Button>
                <Link href="/register">Register me</Link>
            </ThemeProvider>
        </Stack>
        </div>
    );
}

export default Login;
