import React from "react";
import { useState } from "react";
import "../Scss/Gacha.scss";

import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import axios from 'axios';

import Gatchamon from "../Ressources/Gatchamon.png"
import { Dialog } from "@mui/material";
import Invoque from "../Composants/Invoque";

function Gatcha({pokemons, value, user, token, money, setMoney}) {

    const [randS, setRandS] = useState([]);

    const [openO, setOpenO] = useState(false);
    const [openS, setOpenS] = useState(false);

    var divs = document.querySelectorAll('.pokemonBoxDialog');

    divs.forEach(function(div, index) {
        setTimeout(function() {
            div.classList.add('animation');
        }, index * 1000);
    });

    const updateCrypto = () =>{
        const jsonBody = {
            cryptokemons: user.cryptokemons
        }
        
        axios.put(`https://gachemon.osc-fr1.scalingo.io/api/update/user/cryptokemons`, JSON.stringify(jsonBody),{
            headers: {
                'Content-Type': 'application/json',
                Authorization: token[0]
            }
        }).then(response => {
            console.log(response);
        })
        .catch(error =>{
            // console.log(error);
        });
    }
    
    const postPc=()=>{

        const jsonBody = {
            pc: JSON.parse(user.pc),
        }
        // console.log(token[0].exp);
        axios.put(`https://gachemon.osc-fr1.scalingo.io/api/update/user/pc`, JSON.stringify(jsonBody),{
            headers: {
                'Content-Type': 'application/json',
                Authorization: token[0]
            }
        }).then(response => {
            console.log(response);
        })
        .catch(error =>{
            // console.log(error);
        });

    }

    const invoqueOne = () => {
        user.cryptokemons = money - 10000
        setMoney(money - 10000)

        invoqueRarity();

        postPc();
        updateCrypto();
        setOpenO(true);
    }

    const invoqueSix = () => {
        user.cryptokemons = money - 55000
        setMoney(money - 55000)

        for(let i = 0; i < 6; i++){
            invoqueRarity();    
        }

        postPc();
        updateCrypto();
        if(randS.length === 6){
            setOpenS(true);
        }
    }

    const invoqueRarity = () => {
        //Invoque Pokemon aléatoire
        const val = Math.floor(Math.random() * (897 - 1 + 1)) + 1;

        //PC
        const pc = JSON.parse(user.pc)

        if(pokemons[val].apiEvolutions.length === 0){
            if(pokemons[val].apiPreEvolution === "none") {
                //(Seule de sa lignée / Légendaire) Ne possède pas d'évolution et pas de pré évolution
                const proba = Math.floor(Math.random() * 10);
                if (proba === 0) {
                    randS.push(<Invoque key={val} item={pokemons[val]} rarity={3}/>)
                    pc.push(pokemons[val].id)
                    user.pc = JSON.stringify(pc)
                }
                else{invoqueRarity()}
            } else {
                //(Dernier stade d'évolution) Ne possède pas d'évolution mais possède une pré évolution
                const proba = Math.floor(Math.random() * 5);
                if (proba === 0) {
                    randS.push(<Invoque key={val} item={pokemons[val]} rarity={2}/>)
                    pc.push(pokemons[val].id)
                    user.pc = JSON.stringify(pc)
                }
                else{invoqueRarity()}
            }
        } else {
            if(pokemons[val].apiPreEvolution === "none") {
                //(1er stade d'évolution) Possède une évolution mais pas de pré évolution
                randS.push(<Invoque key={val} item={pokemons[val]} rarity={0}/>)
                pc.push(pokemons[val].id)
                user.pc = JSON.stringify(pc)
            } else {
                //(2e stade d'évolution) Possède une évolution et une pré évolution
                const proba = Math.floor(Math.random() * 2);
                if (proba === 0) {
                    randS.push(<Invoque key={val} item={pokemons[val]} rarity={1}/>)
                    pc.push(pokemons[val].id)
                    user.pc = JSON.stringify(pc)
                }
                else{invoqueRarity()}
            }
        }
    }

    const handleClose = () => {
        setOpenO(false);
        setOpenS(false);

        setRandS([]);
    };

    return (
        <div id="Gatcha">
            <Grow in={value === 0} {...(value === 0 ? { timeout: 1000 } : {})}>
                <div>
                    <img alt="" src={Gatchamon} />
                </div>
            </Grow>
            <div className="GatchaButton">
                <Grow in={value === 0} {...(value === 0 ? { timeout: 1000 } : {})}>
                    <Button variant="contained" disabled={user.cryptokemons < 10000} onClick={invoqueOne} onClose={handleClose}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Grid items>
                                Catch 1
                            </Grid>
                            <Grid items>
                                10 000
                            </Grid>
                        </Grid> 
                    </Button>
                </Grow>
                <Grow in={value === 0} {...(value === 0 ? { timeout: 1000 } : {})}>
                    <Button variant="contained" disabled={user.cryptokemons < 55000} onClick={invoqueSix} onClose={handleClose} >
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Grid items>
                                Catch 6
                            </Grid>
                            <Grid items>
                                55 000
                            </Grid>
                        </Grid>
                    </Button>
                </Grow>
            </div>
            <Dialog className="dialogOpen" open={openO} onClose={handleClose} >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 3, sm: 10, md: 1 }}>
                    {randS.map(pokemon => <Grid item xs={12}>{pokemon}</Grid>)}
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </Grid>
                </Grid>
            </Dialog> 
            <Dialog className="dialogOpen" open={openS} onClose={handleClose} >
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {randS.map(pokemon => <Grid item xs={4}>{pokemon}</Grid>)}
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}

export default Gatcha;