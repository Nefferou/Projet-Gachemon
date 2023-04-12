import React from "react";
import { useState } from "react";
import "../Scss/Gacha.scss";

import Button from '@mui/material/Button';

import Gatchamon from "../Ressources/Gatchamon.png"
import { Dialog } from "@mui/material";
import Invoque from "./Invoque";

function Gatcha({pokemons}) {

    const [rand, setRand] = useState(0);
    const randS = [0, 0, 0, 0, 0, 0];

    const [load, isLoad] = useState(false);

    const [openO, setOpenO] = useState(false);
    const [openS, setOpenS] = useState(false);

    const invoqueOne = () => {
        setRand(Math.floor(Math.random() * (897 - 1 + 1)) + 1);
        setOpenO(true);
    }

    const invoqueSix = () => {
        isLoad(true)
        for(let i = 0; i < 6; i++){
             randS[i] = Math.floor(Math.random() * (897 - 1 + 1)) + 1;
        }
        setOpenS(true);
        isLoad(false);
    }

    const handleClose = () => {
        setOpenO(false);
        setOpenS(false);
    };

    return (
        <div id="Gatcha">
            <div>
                <img alt="" src={Gatchamon} />
            </div>
            <div className="GatchaButton">
                <Button variant="contained" onClick={invoqueOne} onClose={handleClose} >Invoquer 1</Button>
                <Button variant="contained" onClick={() => invoqueSix()} onClose={handleClose} >Invoquer 6</Button>
            </div>
            <Dialog open={openO} onClose={handleClose} >
                <Invoque item={pokemons[rand]} />
            </Dialog>
            <Dialog open={openS} onClose={handleClose} >
                {load ? <p>Loading ...</p> : 
                <div>
                    <Invoque item={pokemons[randS[0]]} />
                    <Invoque item={pokemons[randS[1]]} />
                    <Invoque item={pokemons[randS[2]]} />
                    <Invoque item={pokemons[randS[3]]} />
                    <Invoque item={pokemons[randS[4]]} />
                    <Invoque item={pokemons[randS[5]]} />
                </div>}
            </Dialog>
            
        </div>
    );
}

export default Gatcha;