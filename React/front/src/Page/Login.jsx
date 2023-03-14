import React from "react";
import "../SCSS/style.scss";

import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"

function Login() {
    return (
        <Stack id="login" spacing={2}>
            <h1>Login</h1>
            <TextField id="outlined-basic" label="Login" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <Link href="/register">Register me</Link>
        </Stack>
    );
}

export default Login;