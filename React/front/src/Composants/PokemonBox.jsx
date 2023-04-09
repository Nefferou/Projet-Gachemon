import {React} from "react"
import "../Scss/Pokedex.scss"

function PokemonBox({pokemon}) {

    return (
        <div id="pokemonBox">
            <button>
                <p>No.{pokemon.pokedexId}</p>
                <h1>{pokemon.name}</h1>
                <img src={pokemon.image} alt="" />
                <div>
                    <img src={pokemon.apiTypes[0].image} alt="" />
                    {pokemon.apiTypes.length === 2 ? <img src={pokemon.apiTypes[1].image} alt="" /> : null}
                </div>
            </button>
        </div>
    );
}

export default PokemonBox;