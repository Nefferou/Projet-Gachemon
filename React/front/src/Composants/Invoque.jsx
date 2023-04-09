import React from "react";

function Invoque({item}) {
    return (
        <div id="pokemonBoxDialog">
            <p>No.{item.pokedexId}</p>
            <h1>{item.name}</h1>
            <img src={item.image} alt="" />
            <div id="type">
                <img src={item.apiTypes[0].image} alt="" />
                {item.apiTypes.length === 2 ? <img src={item.apiTypes[1].image} alt="" /> : null}
            </div>
        </div>
    );
}

export default Invoque;