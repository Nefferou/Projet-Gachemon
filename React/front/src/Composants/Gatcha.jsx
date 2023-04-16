import React from "react";
import { useState } from "react";
import "../Scss/Gacha.scss";

import Button from '@mui/material/Button';

import Gatchamon from "../Ressources/Gatchamon.png"
import { Dialog } from "@mui/material";
import Invoque from "./Invoque";

function Gatcha({pokemons}) {

    const [rand, setRand] = useState(0);
    const [randS, setRandS] = useState([]);

    //const [load, isLoad] = useState(true);

    const [openO, setOpenO] = useState(false);
    const [openS, setOpenS] = useState(false);

    const invoqueOne = () => {
        setRand(Math.floor(Math.random() * (897 - 1 + 1)) + 1);
        setOpenO(true);
    }

    const invoqueSix = () => {
        let random;
        for(let i = 0; i < 6; i++){
            random = Math.floor(Math.random() * (897 - 1 + 1)) + 1;
            randS.push(<Invoque key={random} item={pokemons[random]} />)
        }
        if(randS.length === 6){
            console.log("yes");
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
            <div>
                <img alt="" src={Gatchamon} />
            </div>
            <div className="GatchaButton">
                <Button variant="contained" onClick={invoqueOne} onClose={handleClose} >Invoquer 1</Button>
                <Button variant="contained" onClick={invoqueSix} onClose={handleClose} >Invoquer 6</Button>
            </div>
            <Dialog className="dialogOpen" open={openO} onClose={handleClose} >
                <Invoque item={pokemons[rand]} />*
            </Dialog> 
            <Dialog className="dialogOpen" open={openS} onClose={handleClose} >
                {randS.map(pokemon => pokemon)}
            </Dialog>
        </div>
    );
}

export default Gatcha;