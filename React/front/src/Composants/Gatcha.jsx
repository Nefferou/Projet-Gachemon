import React from "react";
import { useState, useEffect } from "react";
import "../Scss/Gatcha.scss";

import Button from '@mui/material/Button';

import Gatchamon from "../Ressources/Gatchamon.png"
import { Dialog } from "@mui/material";
import Invoque from "./Invoque";

function Gatcha() {

    // const tabInvoque = [];
    const [rand, setRand] = useState(0);
    const [open, setOpen] = useState(false);

    const [items, setItems] = useState([]);
    const [load, isLoad] = useState(false);

    useEffect(function () {
        fetch("https://pokedex-jgabriele.vercel.app/pokemons.json")
        .then(res => res.json())
        .then(
            (result) => {
            setItems(result)
            isLoad(false)
            }
        )
    }, [])

    const invoqueOne = () => {

        setRand(Math.floor(Math.random() * (151 - 1 + 1)) + 1);
        setOpen(true);
    }

    // const invoqueSix = () => {

    //     let rand = 0;
    //     for(let i = 0; i < 6; i++){
    //         rand = Math.floor(Math.random() * (151 - 1 + 1)) + 1;
    //         tabInvoque.push(<PokemonBox key={items[rand].id} id={items[rand].id} name={items[rand].names['fr']} sprite={items[rand].image} type1={items[rand].types[0]} type2={items[rand].types[1]} all={items[rand]} />)
    //     }
    //     setOpen(true);
    //     console.log(tabInvoque)
    // }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div id="Gatcha">
            <div>
                <img alt="" src={Gatchamon} />
            </div>
            <div className="GatchaButton">
                <Button variant="contained" disabled={load ? true : false} onClick={invoqueOne} onClose={handleClose} >Invoquer 1</Button>
                {/* <Button variant="contained" disabled={load ? true : false} onClick={invoqueSix} onClose={handleClose} >Invoquer 6</Button> */}
            </div>
            <Dialog open={open} onClose={handleClose} >
                {load === true ? null : <Invoque item={items[rand]} />}
            </Dialog>
        </div>
    );
}

export default Gatcha;