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
    const [usernameExists, setUsernameExists] = useState(false);

    const [errorMessageEmail, setErrorMessageEmail] = useState(null);
    const [errorMessageUsername, setErrorMessageUsername] = useState(null);

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
                    setErrorMessageEmail(null);
            })
            .catch(error =>{
                setEmailExists(true);
                setErrorMessageEmail("This email address is already registered.");
            });
    }

    const checkUsernameExists = () =>{
        const jsonBody = {
            username: username
        }
        axios.post(`https://gachemon.osc-fr1.scalingo.io/api/user/username`, JSON.stringify(jsonBody),{
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setUsernameExists(false);
                setErrorMessageUsername(null);
            })
            .catch(error =>{
                setUsernameExists(true);
                setErrorMessageUsername("This username is already registered.");
            });
    }

    const handleRegister = () => {
        if (!emailExists && !usernameExists) {
            const data = {
                username: username,
                email:email,
                password: password
            }
    
            axios.post('https://gachemon.osc-fr1.scalingo.io/api/user/register',JSON.stringify(data),{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    sessionStorage.setItem("token",response.data.token);
                    console.log("Register complete");
                    navigate("/login");
                })
                .catch(error => {console.error(error);
                navigate("/login")});
        }
    }

    return (
        <div className="center">
        <Stack id="register" spacing={2}>
            <ThemeProvider theme={theme}>
                <h1>Register</h1>
                <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} onBlur={checkUsernameExists}/>
                {errorMessageUsername && <p className="error">{errorMessageUsername}</p>}
                <TextField id="outlined-basic" type={"email"} label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} onBlur={checkEmailExists}/>
                {errorMessageEmail && <p className="error">{errorMessageUsername}</p>}
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