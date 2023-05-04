import * as React from 'react';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import { Avatar, Button, Tooltip, Snackbar, Alert} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import "../Scss/Clicker.scss"
import axios from 'axios';


function Clicker({pokemons, money, setMoney, user, token}) {

    const [pok1, setPok1] = useState(1)
    const [pok2, setPok2] = useState(1)
    const [pok3, setPok3] = useState(1)
    const [pok4, setPok4] = useState(1)
    const [pok5, setPok5] = useState(1)
    const [pok6, setPok6] = useState(1)
    
    const [stock, setStock] = useState(0)
    const [isFull, setFull] = useState(false)

    const updateCrypto = () =>{
        const jsonBody = {
            cryptokemons: user.cryptokemons
        }
        
        axios.put(`https://gachemon.osc-fr1.scalingo.io/api/update/cryptokemons`, JSON.stringify(jsonBody),{
            headers: {
                'Content-Type': 'application/json',
                Authorization: token[0]
            }
        }).then(response => {
            console.log(response);
        })
        .catch(error =>{
            // console.log(error);
        });
    }

    const Clicker = () => {
        if(stock >= 1000){
            setFull(true)
            setStock(1000)
        }
        else {
            setStock(stock + 1)
        }
    }

    const handleClose = () => {
        setFull(false)
    }

    const Collect = () => {
        user.cryptokemons = money + stock
        setMoney(money + stock)
        updateCrypto()
        setStock(0)
    }

    return (
        <div className='clicker'>
            <ThemeProvider theme={theme}>
            <Grid item xs={5} container direction="column" justifyContent="center" alignItems="center">
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
            </Grid>
            <Grid item xs={2} container direction="column" sx={{margin: "auto"}}>
                <Button variant="text" onClick={Clicker} color='secondary'>Clicker</Button>
                <Tooltip title="Stock" disableInteractive>
                    <Button>{stock} / 1000</Button>
                </Tooltip>
                <Button variant="text" onClick={Collect} color='secondary'>Collect</Button>
            </Grid>
            <Grid item xs={5} container direction="column" justifyContent="center" alignItems="center">
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
            </Grid>
            <Snackbar open={isFull} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="warning" onClose={handleClose} sx={{ width: '100%' }}>
                    Stock is full
                </Alert>
            </Snackbar>
            </ThemeProvider>
        </div>
    );
}

export default Clicker;