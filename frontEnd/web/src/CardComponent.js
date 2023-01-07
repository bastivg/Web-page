// CardComponent.js
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia"; //Posible uso para agregar imagen de los juegos
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ImgMediaCard(props) {
  const elemento = props.elemento;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {elemento.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {elemento.tiempo_juego}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {elemento.ubicacion}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {elemento.estado}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}