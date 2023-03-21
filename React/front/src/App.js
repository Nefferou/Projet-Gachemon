import React from 'react';
import { useState } from 'react';
import './SCSS/App.scss';

import AppBar from "./Composants/AppBar"
import Header from "./Composants/Header"

function App() {

  const [value, setValue] = useState(1);

  return (
    <div className="App">
      <Header value={value} />

      <div hidden={value !== 0}>
         Super
      </div>
      <div hidden={value !== 1}>
        Cool
      </div>
      <div hidden={value !== 2}>
        Banger
      </div>

      <AppBar value={value} setValue={setValue}/>
    </div>
  );
}

export default App;