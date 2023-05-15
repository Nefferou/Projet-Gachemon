import React, { useState } from "react";
import { Grid } from "@mui/material";

function PC({user, pokemons, setSelect, close}) {

    const pc = JSON.parse(user.pc)

    const selectThis = (nb) => {
        setSelect(nb)
        close()
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{width: '100%', overflow: 'auto', height: '100%', p: '5%'}}>
            {pc.map(id => <button onClick={() => selectThis(id - 1)}><img src={pokemons[id - 1].sprite} alt={id} /></button>)}
        </Grid>
    );
}

export default PC;