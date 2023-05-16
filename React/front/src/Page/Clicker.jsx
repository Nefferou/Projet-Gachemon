import * as React from 'react';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import { Button, Tooltip, Snackbar, Alert, Dialog } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import PC from '../Composants/Pc';
import "../Scss/Clicker.scss"
import axios from 'axios';
import PokemonClicker from '../Composants/PokemonClicker';
import IconButton from '@mui/material/IconButton';
import TvIcon from '@mui/icons-material/Tv';
import Grow from '@mui/material/Grow';
import Avatar from '@mui/material/Avatar';

import ClickerImage from "../Ressources/Clicker.svg"
import CollectImage from "../Ressources/Collect.svg"
import Pc from "../Ressources/Pc.svg"


function Clicker({pokemons, value, money, setMoney, user, token}) {

    const [pok1, setPok1] = useState(undefined)
    const [pok1Stock, setP1Stock] = useState(0)
    const [isLoad1, setLoad1] = useState(false)

    const [pok2, setPok2] = useState(undefined)
    const [pok2Stock, setP2Stock] = useState(0)
    const [isLoad2, setLoad2] = useState(false)

    const [pok3, setPok3] = useState(undefined)
    const [pok3Stock, setP3Stock] = useState(0)
    const [isLoad3, setLoad3] = useState(false)

    const [pok4, setPok4] = useState(undefined)
    const [pok4Stock, setP4Stock] = useState(0)
    const [isLoad4, setLoad4] = useState(false)

    const [pok5, setPok5] = useState(undefined)
    const [pok5Stock, setP5Stock] = useState(0)
    const [isLoad5, setLoad5] = useState(false)

    const [pok6, setPok6] = useState(undefined)
    const [pok6Stock, setP6Stock] = useState(0)
    const [isLoad6, setLoad6] = useState(false)
    
    const [stock, setStock] = useState(0)
    const [isFull, setFull] = useState(false)

    const [pcIsOpen, pcSetOpen] = useState(false)
    const [selecte, setSelect] = useState(undefined)

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

    const openPC = () => {
        pcSetOpen(true)
    }
    
    const closePc = () => {
        pcSetOpen(false)
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
            <Grow in={value === 1} {...(value === 1 ? { timeout: 1000 } : {})}>
            <Grid item xs={4.75} container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={6} direction="column" justifyContent="space-evenly" >
                    <PokemonClicker pokemon={pokemons[pok1]} setPok={setPok1} selecte={pokemons[selecte]} setSelect={setSelect} stock={pok1Stock} setStock={setP1Stock} load={isLoad1} setLoad={setLoad1} />
                </Grid>
                <Grid item xs={6} direction="column" justifyContent="space-evenly">
                    <PokemonClicker pokemon={pokemons[pok2]} setPok={setPok2} selecte={pokemons[selecte]} setSelect={setSelect} stock={pok2Stock} setStock={setP2Stock} load={isLoad2} setLoad={setLoad2} />
                    <PokemonClicker pokemon={pokemons[pok3]} setPok={setPok3} selecte={pokemons[selecte]} setSelect={setSelect} stock={pok3Stock} setStock={setP3Stock} load={isLoad3} setLoad={setLoad3} />
                </Grid>
            </Grid>
            </Grow>
            <Grow in={value === 1} {...(value === 1 ? { timeout: 1000 } : {})}>
            <Grid item xs={2.5} container direction="column" justifyContent="space-evenly" sx={{margin: "auto"}}>
                <IconButton size="small" edge="start" color='info' sx={{m:0, p:0}} onClick={openPC}>  
                    <img id='pc' src={Pc} variant="text" onClick={Clicker} color='secondary'/>
                </IconButton>
                <Tooltip title="Stock">
                    <p id='stock'>{stock} / 100</p>
                </Tooltip>
                <IconButton size="small" edge="start" color='info' sx={{m:'auto', p:'auto', height:'100%', width:'100%'}}>
                    <img id='clicker' src={ClickerImage} variant="text" onClick={Clicker} color='secondary'/>
                </IconButton>
                <IconButton onClick={Collect} size="small" edge="center" sx={{m:0, p:0}} disabled={isLoad1 || isLoad2 || isLoad3 || isLoad4 || isLoad5 || isLoad6 || selecte !== undefined}>
                    <img id='collect' src={CollectImage} onClick={Collect} color='secondary'/>
                </IconButton>
            </Grid>
            </Grow>
            <Grow in={value === 1} {...(value === 1 ? { timeout: 1000 } : {})}>
            <Grid item xs={4.75} container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={6} direction="column" justifyContent="space-evenly">
                    <PokemonClicker pokemon={pokemons[pok4]} setPok={setPok4} selecte={pokemons[selecte]} setSelect={setSelect} stock={pok4Stock} setStock={setP4Stock} load={isLoad4} setLoad={setLoad4} /> 
                    <PokemonClicker pokemon={pokemons[pok5]} setPok={setPok5} selecte={pokemons[selecte]} setSelect={setSelect} stock={pok5Stock} setStock={setP5Stock} load={isLoad5} setLoad={setLoad5} />
                </Grid>
                <Grid item xs={6} direction="column" justifyContent="space-evenly">
                    <PokemonClicker pokemon={pokemons[pok6]} setPok={setPok6} selecte={pokemons[selecte]} setSelect={setSelect} stock={pok6Stock} setStock={setP6Stock} load={isLoad6} setLoad={setLoad6} />
                </Grid>
            </Grid>
            </Grow>
            <Snackbar open={isFull} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="warning" onClose={handleClose} sx={{ width: '100%' }}>
                    Stock is full
                </Alert>
            </Snackbar>
            <Dialog className="dialogOpen" open={pcIsOpen} onClose={closePc} >
                <PC user={user} pokemons={pokemons} setSelect={setSelect} close={closePc} />
            </Dialog>
            </ThemeProvider>
        </div>
    );
}

export default Clicker;