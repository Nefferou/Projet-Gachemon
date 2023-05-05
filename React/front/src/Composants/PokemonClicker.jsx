import {React, useState, useEffect} from "react";
import { Avatar, LinearProgress } from "@mui/material";
import "../Scss/Clicker.scss"

function PokemonClicker({pokemon, add, stock, setStock}) { 

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const speed = pokemon.stats.speed;

    const handleClick = () => {
        setLoading(true);
        setProgress(0);

        setTimeout(() => {
            setLoading(false);
            setStock(stock + 100)
        }, (50000 - (speed * 200)));
    };

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
                <p>{stock}</p>
            </button>
            <LinearProgress variant="determinate" value={progress} />
        </div>
    );
}

export default PokemonClicker;