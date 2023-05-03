import * as React from 'react';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import { Avatar, IconButton } from '@mui/material';
import "../Scss/Clicker.scss"
import axios from 'axios';

import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';


function Clicker({pokemons, money, setMoney, user, token}) {

    const [pok1, setPok1] = useState(1)
    const [pok2, setPok2] = useState(1)
    const [pok3, setPok3] = useState(1)
    const [pok4, setPok4] = useState(1)
    const [pok5, setPok5] = useState(1)
    const [pok6, setPok6] = useState(1)

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
        user.cryptokemons = money + 1
        setMoney(money + 1)
        updateCrypto();
    }

    return (
        <div className='clicker'>
            <Grid item xs={5} container direction="column" justifyContent="center" alignItems="center">
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
            </Grid>
            <Grid item xs={2} sx={{margin: "auto"}}>
                <IconButton aria-label="Clicker" size="large" color="inherit" onClick={Clicker} >
                    <CatchingPokemonIcon sx={{ width: "150%", height: "auto", backgroundColor: "white", borderRadius: "100px" }} />
                </IconButton>
            </Grid>
            <Grid item xs={5} container direction="column" justifyContent="center" alignItems="center">
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
                <Avatar src={pokemons[0].sprite} sx={{ width: "33%", height: "33%" }}/>
            </Grid>
        </div>
    );
}

export default Clicker;