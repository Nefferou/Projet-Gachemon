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

function Gatcha({pokemons, value, user, token}) {

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

    const postPc=()=>{

        const jsonBody = {
            pc: user.pc,
        }
        console.log(token[0].exp);
        axios.post(`https://gachemon.osc-fr1.scalingo.io/api/pc/update`, JSON.stringify(jsonBody),{
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

    const invoqueOne = () => {
        const random = Math.floor(Math.random() * (897 - 1 + 1)) + 1;
        setRand(random);
        const pc = JSON.parse(user.pc);
        pc.pokemons.push(pokemons[random].id);
        user.pc = JSON.stringify(pc);
        postPc();
        setOpenO(true);
    }

    const invoqueSix = () => {
        let random;
        const pc = JSON.parse(user.pc);
        for(let i = 0; i < 6; i++){
            random = Math.floor(Math.random() * (897 - 1 + 1)) + 1;
            randS.push(<Grid key={random} item xs={4}><Invoque key={random} item={pokemons[random]} /></Grid>)
            pc.pokemons.push(pokemons[random].id);
        }
        user.pc = JSON.stringify(pc);
        postPc();
        if(randS.length === 6){
            setOpenS(true);
        }
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
                    <Button variant="contained" onClick={invoqueOne} onClose={handleClose} >Invoquer 1</Button>
                </Grow>
                <Grow in={value === 0} {...(value === 0 ? { timeout: 1000 } : {})}>
                    <Button variant="contained" onClick={invoqueSix} onClose={handleClose} >Invoquer 6</Button>
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