import React from "react";

import Type from "./Type";

function Invoque({item}) {
    return (
        <div id="pokemonBoxDialog">
            <p>No.{item.id}</p>
            <h1>{item.names['fr']}</h1>
            <img src={item.image} alt="" />
            <Type typeOne={item.types[0]} typeTwo={item.types[1]} />
        </div>
    );
}

export default Invoque;