import React from "react";
import { useState } from "react";
import "../Scss/Gacha.scss";

import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";

import Gatchamon from "../Ressources/Gatchamon.png"
import { Dialog } from "@mui/material";
import Invoque from "./Invoque";

function Gatcha({pokemons, value}) {

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

    const invoqueOne = () => {
        setRand(Math.floor(Math.random() * (897 - 1 + 1)) + 1);
        setOpenO(true);
    }

    const invoqueSix = () => {
        let random;
        for(let i = 0; i < 6; i++){
            random = Math.floor(Math.random() * (897 - 1 + 1)) + 1;
            randS.push(<Grid key={random} item xs={4}><Invoque key={random} item={pokemons[random]} /></Grid>)
        }
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
            </Dialog> 
            <Dialog className="dialogOpen" open={openS} onClose={handleClose} >
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {randS.map(pokemon => pokemon)}
                </Grid>
            </Dialog>
        </div>
    );
}

export default Gatcha;