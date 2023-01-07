import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, Grid } from "@mui/material";  //Para agregar tarjetas y coas
import ResponsiveAppBar from "./ResponsiveAppBar";  //Barra de arriba
import Swal from 'sweetalert2'

/*
Nombre
Tiempo_juego
Ubicacion
Estado
*/

export default function RegisterC() {
    const [id_entradas, setid] = useState("");

    const axios = require("axios");
  
    const [id_juegos, setidjuegos] = useState("");
  
    const navigate = useNavigate();
  
    function validateForm() {
      return (
        id_entradas.length > 0 &&
        id_juegos.length > 0
      );
    }
  
    async function handleSubmit(event) {
      event.preventDefault();
      const payload = {
        id_entradas: id_entradas,
        id_juegos: id_juegos,
      };
      console.log(payload);
      const res = await axios
        .post("http://localhost:4000/register_cola", payload)
        .catch(function (error) {
          console.log(error.toJSON());
          navigate("/Cola");
        });
      if (res) {
        //localStorage.setItem('juego', JSON.stringify(this.state))
        //<div>ID juego 1: PASW73912</div>
        navigate("../MenuPrincipal");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Te has encolado con exito.',
          showConfirmButton: false,
          timer: 1500
        })
        }
    }
  
    return (
      <>
        <ResponsiveAppBar />
        <div>idjuego 1 PYRE</div>
        <Card>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justify="center" sx={{ paddingTop: 2 }}>
              <Grid item xs={16} justify="center">
                <TextField
                  fullWidth
                  id="id_entradas"
                  label="ID de la entrada"
                  variant="outlined"
                  value={id_entradas}
                  onChange={(e) => setid(e.target.value)}
                />
              </Grid>
              <Grid item xs={16} justify="center">
                <TextField
                  fullWidth
                  id="id_juegos"
                  label="ID del juego(solo letras)"
                  variant="outlined"
                  value={id_juegos}
                  onChange={(e) => setidjuegos(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={16}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={!validateForm()}
                >  Encolarse
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </>
    );
  }