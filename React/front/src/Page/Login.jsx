import React from "react";
import "../Scss/style.scss";

import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"

import { ThemeProvider } from "@emotion/react";
import theme from "../theme";

function Login() {
    return (
        <Stack id="login" spacing={2}>
            <ThemeProvider theme={theme}>
                <h1>Login</h1>
                <TextField id="outlined-basic" label="Login" variant="outlined" />
                <TextField id="outlined-basic" label="Password" variant="outlined" />
                <Link href="/register">Register me</Link>
            </ThemeProvider>
        </Stack>
    );
}

export default Login;