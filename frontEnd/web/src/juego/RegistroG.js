import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, Grid } from "@mui/material";  //Para agregar tarjetas y coas
import ResponsiveAppBar from "../ResponsiveAppBar";  //Barra de arriba
import Swal from 'sweetalert2'

/*
Nombre
Tiempo_juego
Ubicacion
Estado
*/

export default function RegisterG() {
    const [nombre, setNombre] = useState("");

    const axios = require("axios");
  
    const [tiempo_juego, setTiempo_juego] = useState("");
  
    const [ubicacion, setUbicacion] = useState("");
  
    const [estado, setEstado] = useState("");
  
    const navigate = useNavigate();
  
    function validateForm() {
      return (
        estado.length > 0 &&
        ubicacion.length > 0 &&
        tiempo_juego.length > 0 &&
        nombre.length > 0
      );
    }
  
    async function handleSubmit(event) {
      event.preventDefault();
      const payload = {
        nombre: nombre,
        tiempo_juego: tiempo_juego,
        ubicacion: ubicacion,
        estado: estado,
      };
      console.log(payload);
      const res = await axios
        .post("http://localhost:4000/register_juego", payload)
        .catch(function (error) {
          console.log(error.toJSON());
          navigate("../login");
        });
      if (res) {
        //localStorage.setItem('juego', JSON.stringify(this.state))
        navigate("../MenuPrincipal");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El juego fue guardado con exito.',
          showConfirmButton: false,
          timer: 1500
        })
        }
    }
  
    return (
      <>
        <ResponsiveAppBar />
        <Card>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justify="center" sx={{ paddingTop: 2 }}>
              <Grid item xs={16} justify="center">
                <TextField
                  fullWidth
                  id="Nombre"
                  label="Nombre del Juego"
                  variant="outlined"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Grid>
              <Grid item xs={16} justify="center">
                <TextField
                  fullWidth
                  id="Tiempo_juego"
                  label="Tiempo del juego"
                  variant="outlined"
                  value={tiempo_juego}
                  onChange={(e) => setTiempo_juego(e.target.value)}
                />
              </Grid>
              <Grid item xs={16} justify="center">
                <TextField
                  fullWidth
                  id="Ubicacion"
                  label="Ubicacion"
                  variant="outlined"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                />
              </Grid>
              <Grid item xs={16}>
                <TextField
                  fullWidth
                  id="Estado"
                  label="Estado"
                  variant="outlined"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                />
              </Grid>
              <Grid item xs={16}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={!validateForm()}
                >  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </>
    );
  }
  