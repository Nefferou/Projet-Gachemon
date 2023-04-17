import {React, useState} from "react"
import "../Scss/Pokedex.scss"

import { Zoom } from "@mui/material";
import Grid from "@mui/material/Grid";


function PokemonBox({pokemon}) {

    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
      setIsVisible(true);
    };
  
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    return (
        <div id="pokemonBox" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button>
                <p>No.{pokemon.pokedexId}</p>
                <h1>{pokemon.name}</h1>
                <img src={pokemon.image} alt="" />
                <div style={{ display: isVisible ? 'none' : 'block' }}>
                    <img src={pokemon.apiTypes[0].image} alt="" />
                    {pokemon.apiTypes.length === 2 ? <img src={pokemon.apiTypes[1].image} alt="" /> : null}
                </div>
                <Zoom in={isVisible} style={{ display: isVisible ? 'flex' : 'none' }}>
                    <Grid container>
                        <Grid item xs={4}>
                            <p className="stats">Hp : {pokemon.stats['HP']}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p className="stats">Att : {pokemon.stats['attack']}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p className="stats">Def : {pokemon.stats['defense']}</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p className="stats">AttSpe : {pokemon.stats['special_attack']}</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p className="stats">DefSpe : {pokemon.stats['special_defense']}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <p className="stats">Vit : {pokemon.stats['speed']}</p>
                        </Grid>
                    </Grid>
                </Zoom>
            </button>
        </div>
    );
}

export default PokemonBox;