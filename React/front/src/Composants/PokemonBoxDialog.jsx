import React, { useEffect, useState } from 'react';

import "../SCSS/style.scss"
import "../SCSS/type.scss"
import { List, ListItemText, Pagination } from "@mui/material";
import Type from "./Type"

function PokemonBoxDialog({id, changeId}) {

    const [items, setItems] = useState([]);
    const [load, isLoad] = useState(true);
  
    const handleChange = (event, value) => {
        changeId(value);
    };

    useEffect(function () {
      isLoad(true)
      fetch("https://pokedex-jgabriele.vercel.app/pokemons.json")
        .then(res => res.json())
        .then(
          (result) => {
            isLoad(false)
            setItems(result)
          }
        )
    }, [])

    return (
        <div id="pokemonBoxDialog">
            {load ?
            <div className='loading'>Loading ...</div>
            :
            <div>
                <p>No.{items[id-1].id}</p>
                <h1>{items[id-1].names["fr"]}</h1>
                <img src={items[id-1].image} alt="" />
                <h3>Size : {items[id-1].height} m</h3>
                <h3>Weight : {items[id-1].weight} kg</h3>
                <Type typeOne={items[id-1].types[0]} typeTwo={items[id-1].types[1]} />

                <List id="list" sx={{width: '100%', maxWidth: 360, overflow: 'auto', maxHeight: 250}}subheader={<li />}>
                    {items[id-1].moves.map((move, key) => (
                        <li key={key}>
                            <ListItemText primary={move} />
                        </li>
                    ))}
                </List>
            </div>
            }
            <div id="pagination"><Pagination count={151} page={id} onChange={handleChange} /></div>
        </div>
    );
}

export default PokemonBoxDialog;