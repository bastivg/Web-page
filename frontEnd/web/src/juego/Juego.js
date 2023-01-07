import React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";
import {useEffect, useState} from 'react';
import { Button} from "@mui/material";


export default function Juego() {
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
        
        {loged?
                <div className="row" style={{marginTop:20, marginLeft:50}}>
                        <div className="col">
                        <Button href="juego/Juego"
                            variant="contained"
                            type="submit"
                        >
                        Encolarse
                    </Button>
                    </div>
                </div>
                    
            :
            <div>Not logged in</div>}
        </>
    )}