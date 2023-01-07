import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import {useEffect, useState} from 'react';
import { Button} from "@mui/material";
import Axios  from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Grid} from "@mui/material";
import Axios  from "axios";
import Swal from 'sweetalert2'

//ToDo revisar estos
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function MenuPrincipal() {
        const [user, setUser] = useState(null);
        const [loged, setLoged] = useState(false);
        const [info, setInfo] = useState([]);  //Guardar como estado, cosas reactivas evita que se carge la pagina
        const navigate = useNavigate();
        const [info, setInfo] = useState([]);  //Guardar como estado, cosas reactivas evita que se carge la pagina
        const [id_juego, setActualId] = useState(null);

       useEffect(() => {
            if (localStorage.getItem("user")){
                setUser(localStorage.getItem("user"));
                setLoged(true);
            }
            async function fecthdata(){
                const juegos = await Axios.get('http://localhost:4000/juego');
                console.log(juegos.data.message);
                setInfo(juegos.data.message);
            }
            fecthdata();
        }, [user, loged]);
            
            async function fecthdata() {
                const juegos = await Axios.get('http://localhost:4000/Getjuego');    
                const juegos_as_json = JSON.parse(juegos.data.message); //Paso a json los datos recibidos
                //console.log("hola",juegos_as_json); //esto muestra por consola
                setInfo(juegos_as_json);
            }
            fecthdata();
        }, [user, loged, info]);

        function borrar_juego(event) {
            Swal.fire({
                title: 'Estas seguro que deseas eliminar?',
                text: "No se puede revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar'
              }).then((result) => {
                if (result.isConfirmed) {
                    confirmar_borrar_juego(event)
                }
              })
        }
        
        async function confirmar_borrar_juego(event){
            setActualId(event.id)
            const del = await Axios
                .delete("http://localhost:4000/Deletejuego/"+event.id)
                .catch(function (error) {
                  console.log(error.toJSON());
                });
              if (del) {
                Swal.fire({
                    title: 'Eliminado',
                    text: "El juego fue eliminado con exito",
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = window.location.href
                    }

                })
                console.log("Se borro",event.id)
              }
            }

        function editar_juego(event){
            localStorage.setItem("id", event.id);
            navigate("/juego/Editarjuego")
        }

        function ingreso_usuario(){
            Swal.fire({
                title: 'Ingresando al parque.',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(/images/trees.png)',
                backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
                `
            })
            navigate("/MenuCliente")
        }

          

        const lectura_juegos = ()=>{  //funcion que devuelve un html que va a mostrar la informacion
            return info.map((res)=>{
                return ( <Grid xs ={1}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {res.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Tiempo de juego: {res.tiempo_juego}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Ubicacion: {res.ubicacion}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Estado: {res.estado}
                        </Typography>
                    </CardContent>
                        <CardActions>
                                <Button id = {res.id_juego} size="small" onClick={(e) => editar_juego(e.target)}>
                                    Editar
                                </Button>
                                <Button id = {res.id_juego} size = "small" onClick={(e) => borrar_juego(e.target)}>
                                    Borrar
                                </Button>
                        </CardActions>
                </Card>
                </Grid>)
            });
        };



        const lectura_juegos = ()=>{  //funcion que devuelve un html que va a mostrar la informacion
            return info.map((res)=>{
                return <h1>{res}</h1>
            });
        };


        return (
            <>
            <ResponsiveAppBar />
            {loged?
                    <div className="row" style={{marginTop:20, marginLeft:50}}>
                            <div className="col">
                            <Button href="juego/RegistroG"
                                variant="contained"
                                type="submit"
                            >
                            Agregar juego
                        </Button>
                        {lectura_juegos()}
                        </div>
                    </div>
                        
                :

                <div>Not logged in</div>}
                <>
                    {lectura_juegos()}
                </>

                <div>
                <>
                <br></br>
                    <Button variant="contained" color="success" onClick={(e) => ingreso_usuario()}
                    style={{position: 'fixed', top: 120, right: '45%', width:'200px', height:'100px'}}>
                        Ingreso Clientes</Button>
                    <Button href="MostrarOperario"
                    style={{position: 'fixed', bottom: 120, right: '30%', width:'200px', height:'100px'}}>
                        Ingreso Operario
                    </Button>
                    <Button
                    style={{position: 'fixed', bottom: 120, left: '25%', width:'300px', height:'100px'}}>
                        Ingreso Administrador
                    </Button>
                </>
                </div>}
            </>
        )}