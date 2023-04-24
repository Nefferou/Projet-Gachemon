import React from "react"
import "../Scss/Pokedex.scss"

import PokemonBox from "./PokemonBox";

import { Grid } from "@mui/material";

function Pokedex({pokemons, search, value}) {

    const pokedex = [];
    
    pokemons.forEach((pokemon) =>{
        if(pokemon.name.toLowerCase().includes(search.toLowerCase()) || pokemon.apiTypes[0].name.toLowerCase().includes(search.toLowerCase()) || (pokemon.apiTypes.length === 2 ? pokemon.apiTypes[1].name.toLowerCase().includes(search.toLowerCase()) : false)){
            pokedex.push(<Grid item xs={2}><PokemonBox key={pokemon.id} pokemon={pokemon} value={value} /></Grid>)

        }
    })

    return (
        <div id="pokedex">
            <Grid container spacing={2} sx={{width: '100%', overflow: 'auto', height: 650}}>
                {pokedex}
            </Grid>
        </div>
    );
}

export default Pokedex;