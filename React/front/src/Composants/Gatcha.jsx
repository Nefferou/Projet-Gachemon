import React from "react";
import "../Scss/style.scss";

import Button from '@mui/material/Button';

import Gatchamon from "../Ressources/Gatchamon.png"

function Gatcha() {
    return (
        <div id="Gatcha">
            <div>
                <img src={Gatchamon} />
            </div>
            <div className="GatchaButton">
                <Button variant="contained">Invoquer 1</Button>
                <Button variant="contained">Invoquer 6</Button>
            </div>
        </div>
    );
}

export default Gatcha;