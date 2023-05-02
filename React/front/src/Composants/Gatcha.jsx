import React from "react";
import { useState } from "react";
import "../Scss/Gacha.scss";

import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import axios from 'axios';

import Gatchamon from "../Ressources/Gatchamon.png"
import { Dialog } from "@mui/material";
import Invoque from "./Invoque";

function Gatcha({pokemons, value, user, token, money, setMoney}) {

    const [rand, setRand] = useState(0);
    const [randS, setRandS] = useState([]);

    const [openO, setOpenO] = useState(false);
    const [openS, setOpenS] = useState(false);

    var divs = document.querySelectorAll('.pokemonBoxDialog');

    divs.forEach(function(div, index) {
        setTimeout(function() {
            div.classList.add('animation');
        }, index * 1000);
    });
    const updateCrypto = () =>{
        const jsonBody = {
            cryptokemons: user.cryptokemons
        }
        console.log(JSON.stringify(jsonBody));
        axios.put(`https://gachemon.osc-fr1.scalingo.io/api/update/cryptokemons`, JSON.stringify(jsonBody),{
            headers: {
                'Content-Type': 'application/json',
                Authorization: token[0]
            }
        }).then(response => {
            console.log(response);
        })
        .catch(error =>{
            console.log(error);
        });
    }
    const postPc=()=>{

        const jsonBody = {
            pc: JSON.parse(user.pc),
        }
        console.log(token[0].exp);
        axios.post(`https://gachemon.osc-fr1.scalingo.io/api/update/pc`, JSON.stringify(jsonBody),{
            headers: {
                'Content-Type': 'application/json',
                Authorization: token[0]
            }
        }).then(response => {
            // console.log(jsonBody.pc);
            // console.log(user.pc);
        })
        .catch(error =>{
            console.log(error);
        });

    }

    const invoqueOne = () => {
        setMoney(money - 100)
        user.cryptokemons -= 100

        const random = Math.floor(Math.random() * (897 - 1 + 1)) + 1;
        setRand(random);

        const pc = JSON.parse(user.pc)
        pc.push(pokemons[random].id)
        user.pc = JSON.stringify(pc)

        postPc();
        updateCrypto();
        setOpenO(true);

        console.log(user);
    }

    const invoqueSix = () => {
        setMoney(money - 550)
        user.cryptokemons -= 550

        const pc = JSON.parse(user.pc)
        for(let i = 0; i < 6; i++){
            const random = Math.floor(Math.random() * (897 - 1 + 1)) + 1;
            randS.push(<Grid key={random} item xs={4}><Invoque key={random} item={pokemons[random]} /></Grid>)
            pc.push(pokemons[random].id)
        }

        user.pc = JSON.stringify(pc)

        postPc();
        updateCrypto();
        if(randS.length === 6){
            setOpenS(true);
        }
        
        console.log(user);
    }

    const handleClose = () => {
        setOpenO(false);
        setOpenS(false);

        setRandS([]);
    };

    return (
        <div id="Gatcha">
            <Grow in={value === 0} {...(value === 0 ? { timeout: 1000 } : {})}>
                <div>
                    <img alt="" src={Gatchamon} />
                </div>
            </Grow>
            <div className="GatchaButton">
                <Grow in={value === 0} {...(value === 0 ? { timeout: 1000 } : {})}>
                    <Button variant="contained" disabled={user.cryptokemons < 100} onClick={invoqueOne} onClose={handleClose} >Invoquer 1</Button>
                </Grow>
                <Grow in={value === 0} {...(value === 0 ? { timeout: 1000 } : {})}>
                    <Button variant="contained" disabled={user.cryptokemons < 550} onClick={invoqueSix} onClose={handleClose} >Invoquer 6</Button>
                </Grow>
            </div>
            <Dialog className="dialogOpen" open={openO} onClose={handleClose} >
                <Invoque item={pokemons[rand]} />
                <Button variant="contained" onClick={handleClose}>Close</Button>
            </Dialog> 
            <Dialog className="dialogOpen" open={openS} onClose={handleClose} >
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {randS.map(pokemon => pokemon)}
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}

export default Gatcha;