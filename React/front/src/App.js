import React from 'react';
import './SCSS/App.scss';

import AppBar from "./Composants/AppBar"

function App() {

  const [value, setValue] = React.useState(0);
  
  return (
    <div className="App">
      <div>Salut</div>
      
      <div hidden={value !== 0}>
         Super
      </div>
      <div hidden={value !== 1}>
        Cool
      </div>
      <div hidden={value !== 2}>
        Banger
      </div>

      <AppBar value={value} setValue={setValue} />
    </div>
  );
}

export default App;