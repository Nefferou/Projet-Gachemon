import React from "react";
import { Avatar } from "@mui/material";
import "../Scss/Clicker.scss"

function PokemonClicker({pokemon}) {    

    

    return (
        <div id="pokemonClicker">
            <button>
                <Avatar src={pokemon.sprite} sx={{ width: "100%", height: "100%" }}/>
            </button>
        </div>
    );
}

export default PokemonClicker;