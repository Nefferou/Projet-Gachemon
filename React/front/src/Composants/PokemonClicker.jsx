import {React, useState, useEffect} from "react";
import { Avatar, LinearProgress, Snackbar, Button, Alert } from "@mui/material";
import "../Scss/Clicker.scss"

function PokemonClicker({pokemon, stock, setStock}) { 

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFull, setFull] = useState(false);

    const att = pokemon.stats.attack + pokemon.stats.special_attack
    const def = pokemon.stats.defense + pokemon.stats.special_defense
    const speed = pokemon.stats.speed;


    const handleClick = () => {
        setLoading(true);
        setProgress(0);

        setTimeout(() => {
            setLoading(false);
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

    useEffect(() => {
        let timerId;
        if (loading) {
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
      }, [loading]);

    return (
        <div id="pokemonClicker">
            <button onClick={handleClick}>
                <Avatar src={pokemon.sprite} sx={{ width: "100%", height: "100%" }}/>
            </button>
            <p><Button>{stock} / {def * 5}</Button></p>
            <LinearProgress variant="determinate" value={progress} />
            <Snackbar open={isFull} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="warning" onClose={handleClose} sx={{ width: '100%' }}>
                    {pokemon.name} stock is full
                </Alert>
            </Snackbar>
        </div>
    );
}

export default PokemonClicker;