import {React} from "react"
import "../Scss/style.scss"
import "../Scss/type.scss"
import Type from "./Type"

function PokemonBox({id, name, sprite, type1, type2}) {

    return (
        <div id="pokemonBox">
                <p>No.{id}</p>
                <h1>{name}</h1>
                <img src={sprite} alt="" />
                <Type typeOne={type1} typeTwo={type2} />
        </div>
    );
}

export default PokemonBox;