import React, { useState } from "react";
import { Grid, Button, ButtonGroup, Box } from "@mui/material";

function PC({user, pokemons, setSelect, close}) {

    const pc = JSON.parse(user.pc)
    const [value, setValue] = useState(1)

    const selectThis = (nb) => {
        setSelect(nb)
        close()
    }

    const changeValue = (val) => {
        setValue(val)
    }

    function sortById(key1, key2) {
        return key1 - key2
    }

    return (
        <>
            <ButtonGroup sx={{zIndex: 1}} variant="contained" aria-label="Disabled elevation buttons" >
                <Button onClick={() => changeValue(0)}>Sort by Newest</Button>
                <Button onClick={() => changeValue(1)}>Sort by ID</Button>
                <Button onClick={() => changeValue(2)}>Sort by Oldest</Button>
            </ButtonGroup>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{width: '100%', overflow: 'auto', height: '100%', p: '5%'}}>
                {value === 0 ? pc.reverse().map(id => <Button sx={{bgcolor: 'rgb(0, 0, 0)', m: '1%', border: 'solid #85858575 2px;'}} onClick={() => selectThis(id - 1)}><img src={pokemons[id - 1].sprite} alt={id} /></Button>)
                : value === 1 ? pc.sort(sortById).map(id => <Button sx={{bgcolor: 'rgb(0, 0, 0)', m: '1%', border: 'solid #85858575 2px;'}} onClick={() => selectThis(id - 1)}><img src={pokemons[id - 1].sprite} alt={id} /></Button>)
                : pc.map(id => <Button sx={{bgcolor: 'rgb(0, 0, 0)', m: '1%', border: 'solid #85858575 2px;'}} onClick={() => selectThis(id - 1)}><img src={pokemons[id - 1].sprite} alt={id} /></Button>)}
            </Grid>
            <Button variant="contained" onClick={close} >Close</Button>
        </>
    );
}

export default PC;