import React from "react";
import { useState, useEffect } from "react";
import "../Scss/style.scss";

import Type from "./Type";

import Button from '@mui/material/Button';

import Gatchamon from "../Ressources/Gatchamon.png"
import { Dialog } from "@mui/material";

function Gatcha() {

    // const tabInvoque = [];
    const [rand, setRand] = useState(0);
    const [open, setOpen] = useState(false);

    const [items, setItems] = useState([]);
    const [load, isLoad] = useState(false);

    useEffect(function () {
        isLoad(true)
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
        // tabInvoque.push(<div>
        //                     <p>No.{items[rand].id}</p>
        //                     <h1>{items[rand].names['fr']}</h1>
        //                     <img src={items[rand].image} alt="" />
        //                     <Type typeOne={items[rand].types[0]} typeTwo={items[rand].types[1]} />
        //                 </div>)
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
                {items != null ? <div>
                    <p>No.{items[rand].id}</p>
                    <h1>{items[rand].names['fr']}</h1>
                    <img src={items[rand].image} alt="" />
                    <Type typeOne={items[rand].types[0]} typeTwo={items[rand].types[1]} />
                </div> : <p>Loading</p>}
            </Dialog>
        </div>
    );
}

export default Gatcha;