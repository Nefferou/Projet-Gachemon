import React from "react"
import "../Scss/style.scss"

import PokemonBox from "./PokemonBox";

import { List } from "@mui/material";

function Pokedex({pokemons, search}) {

    let i = 0;
    const pokedex = [];
    const tab = [];

    pokemons.forEach((pokemon) =>{
        if(pokemon.names['fr'].toLowerCase().includes(search.toLowerCase()) || pokemon.types[0].toUpperCase().includes(search.toUpperCase()) || (pokemon.types[1] ? pokemon.types[1].toUpperCase().includes(search.toUpperCase()) : false)){
            pokedex.push(<PokemonBox key={pokemon.id} id={pokemon.id} name={pokemon.names['fr']} sprite={pokemon.image} type1={pokemon.types[0]} type2={pokemon.types[1]} all={pokemon}/>)
        }
    })
    
    pokedex.forEach(() => {
        if(i % 6 === 0){
            tab.push(<Line key={i} pokemons={pokedex.slice(i, i+6)}/>)
        }
        i++
    })

    return (
        <div id="pokedex">
            <List id="list" sx={{width: '100%', overflow: 'auto', height: 650}}subheader={<li />}>
                <li>
                    {tab}
                </li>
            </List>
        </div>
    );
}

function Line({pokemons}) {
    
    return (
        <div className="line">
            {pokemons.map((pokemon) => pokemon)}
        </div>
    )
}

export default Pokedex;