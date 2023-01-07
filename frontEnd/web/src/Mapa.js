import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import {useEffect, useState} from 'react';
import { Button} from "@mui/material";
import mapa from "./assets/mapaparque.png"

export default function Mapa() {
        const [user, setUser] = useState(null);
        const [loged, setLoged] = useState(false);
  
        useEffect(() => {
            if (localStorage.getItem("user")){
                setUser(localStorage.getItem("user"));
                setLoged(true);
            }
        }, [user, loged]);

        return (
            <>
            <ResponsiveAppBar />
            <div>
                <img src={mapa}/>

             </div>
            {loged?
                    <div className="row" style={{marginTop:20, marginLeft:50}}>
                            <div className="col">
                            <Button href="./Cola"
                                variant="contained"
                                type="submit"
                            >
                            Encolarse Juego 1
                        </Button>
                        </div>
                    </div>
                        
                :
                <div>Not logged in</div>}
            </>
        )}
