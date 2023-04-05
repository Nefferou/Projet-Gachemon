import {React, useState} from "react"
import PokemonBoxDialog from "./PokemonBoxDialog";
import "../Scss/style.scss"
import "../Scss/type.scss"
import Dialog from '@mui/material/Dialog';
import Type from "./Type"

function PokemonBox({id, name, sprite, type1, type2}) {

    const [ids, setIds] = useState(id);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setIds(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div id="pokemonBox">
            <button onClick={handleClickOpen}>
                <p>No.{id}</p>
                <h1>{name}</h1>
                <img src={sprite} alt="" />
                <Type typeOne={type1} typeTwo={type2} />
            </button>
        </div>
    );
}

export default PokemonBox;