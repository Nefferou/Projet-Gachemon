import React from "react";
import { Box } from "@mui/material";
import "../Scss/Gacha.scss";

function Invoque({item, rarity}) {
    return (
        <Box className="pokemonBoxDialog" 
        sx={rarity === 0 ? {border: "solid lightgrey 2px"} : 
        rarity === 1 ? {border: "solid blue 2px"} :
        rarity === 2 ? {border: "solid purple 2px"} :
        {border: "solid yellow 2px"}} >
            <p>No.{item.pokedexId}</p>
            <h1>{item.name}</h1>
            <img src={item.image} alt="" />
            <div id="type">
                <img src={item.apiTypes[0].image} alt="" />
                {item.apiTypes.length === 2 ? <img src={item.apiTypes[1].image} alt="" /> : null}
            </div>
        </Box>
    );
}

export default Invoque;