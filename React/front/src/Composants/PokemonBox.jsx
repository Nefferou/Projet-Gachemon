import {React, useState} from "react"
import "../Scss/Pokedex.scss"

import { Zoom } from "@mui/material";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";


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
            <Grow in={pokemon !== null} {...(pokemon !== null ? { timeout: 1000 } : {})}>
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
                                <p className="stats" style={{fontWeight: "bold", color: "darkgreen"}}>Hp : {pokemon.stats['HP']}</p>
                            </Grid>
                            <Grid item xs={4}>
                                <p className="stats" style={{fontWeight: "bold", color: "red"}}>Att : {pokemon.stats['attack']}</p>
                            </Grid>
                            <Grid item xs={4}>
                                <p className="stats" style={{fontWeight: "bold", color: "blue"}}>Def : {pokemon.stats['defense']}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="stats" style={{fontWeight: "bold", color: "darkred"}}>AttSpe : {pokemon.stats['special_attack']}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="stats" style={{fontWeight: "bold", color: "darkblue"}}>DefSpe : {pokemon.stats['special_defense']}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <p className="stats" style={{fontWeight: "bold", color: "green"}}>Vit : {pokemon.stats['speed']}</p>
                            </Grid>
                        </Grid>
                    </Zoom>
                    
                </button>
            </Grow>
        </div>
    );
}

export default PokemonBox;