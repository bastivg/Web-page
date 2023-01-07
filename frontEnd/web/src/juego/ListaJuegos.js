import React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, Grid } from "@mui/material";
import Swal from 'sweetalert2';
import Axios  from "axios";


export default function Lista() {
    const [user, setUser] = useState(null);
    const [loged, setLoged] = useState(false);
    const [id, setID] = useState(null);
    const [nombre, setNombre] = useState("");
    const axios = require("axios");
  
    const [tiempo_juego, setTiempo_juego] = useState("");
    const [info, setInfo] = useState([]); 
  
    const [ubicacion, setUbicacion] = useState("");
  
    const [estado, setEstado] = useState("");
  
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user")){
            setUser(localStorage.getItem("user"));
            setLoged(true);
        }
        if (localStorage.getItem("id")){
            setID(localStorage.getItem("id"));
            console.log("id aca", id)

            //Aca se refresca todo el rato
            async function fecthdata() {
                const juegos = await Axios.get('http://localhost:4000/Getjuego_id/'+id);    
                const juegos_as_json = JSON.parse(juegos.data.message); //Paso a json los datos recibidos
                console.log("hola",juegos_as_json); //esto muestra por consola
                setInfo(juegos_as_json);
                setNombre(juegos_as_json[0].nombre);
                setTiempo_juego(juegos_as_json[0].tiempo_juego);
                setUbicacion(juegos_as_json[0].ubicacion);
                setEstado(juegos_as_json[0].estado);
            }
            fecthdata();
        }
    }, [user, loged]);

    function validateForm() {
        return (
          estado.length > 0 &&
          ubicacion.length > 0 &&
          tiempo_juego.length > 0 &&
          nombre.length > 0
        );
      }
    
      const lectura_juegos = ()=>{  //funcion que devuelve un html que va a mostrar la informacion
        return info.map((res)=>{
            return(
                <>
        <Card>
        <Grid container spacing={2} justify="center" sx={{ paddingTop: 2 }}>
            <Grid item xs={16} justify="center">
            <TextField
                fullWidth
                id="Nombre"
                label="Nombre del Juego"
                variant="outlined"
                defaultValue={res.nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            </Grid>
            <Grid item xs={16} justify="center">
            <TextField
                fullWidth
                id="Tiempo_juego"
                label="Tiempo del juego"
                variant="outlined"
                defaultValue={res.tiempo_juego}
                onChange={(e) => setTiempo_juego(e.target.value)}
            />
            </Grid>
            <Grid item xs={16} justify="center">
            <TextField
                fullWidth
                id="Ubicacion"
                label="Ubicacion"
                variant="outlined"
                defaultValue={res.ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
            />
            </Grid>
            <Grid item xs={16}>
            <TextField
                fullWidth
                id="Estado"
                label="Estado"
                variant="outlined"
                defaultValue={res.estado}
                onChange={(e) => setEstado(e.target.value)}
            />
            </Grid>
            <Grid item xs={16}>
            <Button
                fullWidth
                variant="contained"
                type="submit"
            >  Encolarse
            </Button>
            </Grid>
        </Grid>
        </Card>
      </>
            )
        });
    };

    return (
        <>
        <ResponsiveAppBar />
       
        {loged?
                
                <div className="row" style={{marginTop:20, marginLeft:50}}>
                        <div className="col">
                        {lectura_juegos()}
                        <Button href="juego/Juego"
                            variant="contained"
                            type="submit"
                        >
                        Juego 1
                    </Button>
                    </div>
                </div>
                    
            :
            <div>Not logged in</div>}
        </>
    )}