import {React, useState, useEffect} from "react";
import { LinearProgress, Snackbar, Alert } from "@mui/material";
import "../Scss/Clicker.scss"
import NoPokemon from "../Ressources/NoPokemon.png"

function PokemonClicker({pokemon, setPok, selecte, setSelect, stock, setStock, load, setLoad}) { 

    const [progress, setProgress] = useState(0);
    const [isFull, setFull] = useState(false);
    
    const [att, setAtt] = useState(0)
    const [def, setDef] = useState(0)
    const [speed, setSpeed] = useState(0)

    const handleClick = () => {
        setLoad(true);
        setProgress(0);
        setTimeout(() => {
            setLoad(false);
            if(stock + att > (def * 5)) {
                setStock(def * 5)
                setFull(true)
            } else {
                setStock(stock + att)
            }
        }, (50000 - (speed * 200)));
    };

    const handleClose = () => {
        setFull(false)
    }

    const changePokemon = () => {
        setPok(selecte.pokedexId - 1)
        setAtt(selecte.stats.attack + selecte.stats.special_attack)
        setDef(selecte.stats.defense + selecte.stats.special_defense)
        setSpeed(selecte.stats.speed)
        setStock(0)
        setSelect(undefined)
    }

    useEffect(() => {
        let timerId;
        if (load) {
          timerId = setInterval(() => {
            setProgress((prevProgress) =>
              prevProgress >= 100 ? 0 : prevProgress + 1
            );
          }, (500 - (speed * 2)));
        }
        else {setProgress(0)}
        return () => {
          clearInterval(timerId);
        };
      }, [load]);

    return (
        <div id="pokemonClicker">
            <button disabled={load ? true : false} onClick={selecte === undefined ? handleClick : changePokemon}>
                {pokemon !== undefined ? <img src={pokemon.sprite} alt="pokemon"/> : 
                <img src={NoPokemon} alt="noPokemon"/>}
                <LinearProgress variant="determinate" value={progress} />
            </button>
            {selecte === undefined || load ? 
            <p>{stock} / {def * 5}</p> :
            <p>Change</p>}
            {pokemon !== undefined ? <Snackbar open={isFull} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="warning" onClose={handleClose} sx={{ width: '100%' }}>
                    {pokemon.name} stock is full
                </Alert>
            </Snackbar> : null}
            {selecte !== undefined ?<Snackbar open={true}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {selecte.name} selected
                </Alert>
            </Snackbar> : null}
        </div>
    );
}

export default PokemonClicker;