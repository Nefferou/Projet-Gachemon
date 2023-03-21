import React from "react";
import "../SCSS/style.scss";

import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { Button } from "@mui/material";

import { ThemeProvider } from "@emotion/react";
import theme from "../theme";

function Register() {

    return (
        <Stack id="register" spacing={2}>
            <ThemeProvider theme={theme}>
                <h1>Register</h1>
                <TextField id="outlined-basic" label="Login" variant="outlined" />
                <TextField id="outlined-basic" label="Email" variant="outlined" />
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
                <TextField id="outlined-basic" label="Confirm password" variant="outlined" type="password" />
            <Button variant="contained" >Create Account</Button>
            </ThemeProvider>
        </Stack>
    );
}

export default Register;