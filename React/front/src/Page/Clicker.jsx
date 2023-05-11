import * as React from 'react';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import { Avatar, Button, Tooltip, Snackbar, Alert} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import "../Scss/Clicker.scss"
import axios from 'axios';
import PokemonClicker from '../Composants/PokemonClicker';


function Clicker({pokemons, money, setMoney, user, token}) {

    const [pok1, setPok1] = useState(385)
    const [pok1Stock, setP1Stock] = useState(0)
    const [isLoad1, setLoad1] = useState(false)

    const [pok2, setPok2] = useState(150)
    const [pok2Stock, setP2Stock] = useState(0)
    const [isLoad2, setLoad2] = useState(false)

    const [pok3, setPok3] = useState(149)
    const [pok3Stock, setP3Stock] = useState(0)
    const [isLoad3, setLoad3] = useState(false)

    const [pok4, setPok4] = useState(1)
    const [pok4Stock, setP4Stock] = useState(0)
    const [isLoad4, setLoad4] = useState(false)

    const [pok5, setPok5] = useState(1)
    const [pok5Stock, setP5Stock] = useState(0)
    const [isLoad5, setLoad5] = useState(false)

    const [pok6, setPok6] = useState(1)
    const [pok6Stock, setP6Stock] = useState(0)
    const [isLoad6, setLoad6] = useState(false)
    
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
        setStock(stock)
        if(stock >= 100){
            setFull(true)
            setStock(100)
        }
        else {
            setStock(stock + 1)
        }
    }

    const handleClose = () => {
        setFull(false)
    }

    const Collect = () => {
        user.cryptokemons = money + stock  + pok1Stock + pok2Stock + pok3Stock + pok4Stock + pok5Stock + pok6Stock
        setMoney(money + stock  + pok1Stock + pok2Stock + pok3Stock + pok4Stock + pok5Stock + pok6Stock)
        updateCrypto()
        setStock(0)
        setP1Stock(0)
        setP2Stock(0)
        setP3Stock(0)
        setP4Stock(0)
        setP5Stock(0)
        setP6Stock(0)
    }

    return (
        <div className='clicker'>
            <ThemeProvider theme={theme}>
            <Grid item xs={5} container direction="column" justifyContent="center" alignItems="center">
                <PokemonClicker pokemon={pokemons[pok1]} stock={pok1Stock} setStock={setP1Stock} load={isLoad1} setLoad={setLoad1} />
                <PokemonClicker pokemon={pokemons[pok2]} stock={pok2Stock} setStock={setP2Stock} load={isLoad2} setLoad={setLoad2} />
                <PokemonClicker pokemon={pokemons[pok3]} stock={pok3Stock} setStock={setP3Stock} load={isLoad3} setLoad={setLoad3} />
            </Grid>
            <Grid item xs={2} container direction="column" sx={{margin: "auto"}}>
                <Button variant="text" onClick={Clicker} color='secondary'>Clicker</Button>
                <Tooltip title="Stock" disableInteractive>
                    <Button>{stock} / 100</Button>
                </Tooltip>
                <Button disabled={isLoad1 || isLoad2 || isLoad3 || isLoad4 || isLoad5 || isLoad6 ? true : false} variant="text" onClick={Collect} color='secondary'>Collect</Button>
            </Grid>
            <Grid item xs={5} container direction="column" justifyContent="center" alignItems="center">
                <PokemonClicker pokemon={pokemons[pok4]} stock={pok4Stock} setStock={setP4Stock} load={isLoad4} setLoad={setLoad4} /> 
                <PokemonClicker pokemon={pokemons[pok5]} stock={pok5Stock} setStock={setP5Stock} load={isLoad5} setLoad={setLoad5} />
                <PokemonClicker pokemon={pokemons[pok6]} stock={pok6Stock} setStock={setP6Stock} load={isLoad6} setLoad={setLoad6} />
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