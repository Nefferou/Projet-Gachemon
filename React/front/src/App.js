import React from 'react';
import { useState, useEffect } from 'react';
import './Scss/App.scss';
import soon from './Ressources/enCours.gif'

import AppBar from "./Composants/AppBar"
import Header from "./Composants/Header"
import Pokedex from './Composants/Pokedex';

import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Gatcha from './Composants/Gatcha';

import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

import { useNavigate } from "react-router-dom";

function App() {

  const [value, setValue] = useState(2);
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([]);
  const [load, isLoad] = useState(true);

  const user = useState(
    JSON.parse(
      sessionStorage.getItem("user")))  

  const navigate = useNavigate();

  useEffect(function () {
    isLoad(true)
    fetch("https://pokebuildapi.fr/api/v1/pokemon")
    .then(res => res.json())
    .then(
      (result) => {
        isLoad(false)
        setItems(result)
      }
    )
  }, [])

  return (
    <div className="App">
      {user === undefined ?
      navigate("/login") :
      <ThemeProvider theme={theme}>

      <Header value={value} changeSearch={setSearch} user={user[0]} />

      <div hidden={value !== 0}>
        {load ? 
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box> : 
        <Gatcha pokemons={items} value={value} />}
      </div>

      <div style={{backgroundColor: "black"}} hidden={value !== 1}>
        <img src={soon} alt='en cours'/>
      </div>

      <div hidden={value !== 2}>
        {load ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box> :
        <Pokedex pokemons={items} search={search} value={value} />}
      </div>

      <AppBar value={value} setValue={setValue}/>

      </ThemeProvider>}
    </div>
  );
}

export default App;