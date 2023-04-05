import React from "react";
import { useState, useEffect } from "react";
import "../Scss/style.scss";

import Type from "./Type";

import Button from '@mui/material/Button';

import Gatchamon from "../Ressources/Gatchamon.png"
import { Dialog } from "@mui/material";

function Gatcha() {

    const [nbInvoque, setNbInvoque] = useState(1);
    const [open, setOpen] = useState(false);

    const [items, setItems] = useState([]);
    const [load, isLoad] = useState(true);

    useEffect(function () {
        isLoad(true)
        fetch("https://pokedex-jgabriele.vercel.app/pokemons.json")
        .then(res => res.json())
        .then(
            (result) => {
            isLoad(false)
            setItems(result)
            console.log(result[nbInvoque])
            }
        )
    }, [])

    const invoqueOne = () => {
        setNbInvoque(1);
        setOpen(true);
    }

    const invoqueSix = () => {
        setNbInvoque(6);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
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
            <Dialog open={open} onClose={handleClose} >
                {load ? <p>Loading...</p> : 
                <div id="pokemonBox">
                    <p>No.{items[nbInvoque].id}</p>
                    <h1>{items[nbInvoque].names['fr']}</h1>
                    <img src={items[nbInvoque].image} alt="" />
                    <Type typeOne={items[nbInvoque].types[0]} typeTwo={items[nbInvoque].types[1]} />
                </div>}
            </Dialog>
        </div>
    );
}

export default Gatcha;