import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, Grid } from "@mui/material";
import ResponsiveAppBar from "../ResponsiveAppBar";

export default function Register() {
  const [password, setPassword] = useState("");

  const axios = require("axios");

  const [username, setUsername] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      username.length > 0 &&
      name.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      username: username,
      password: password,
      name: name,
      email: email,
    };
    console.log(payload);
    const res = await axios
      .post("http://localhost:4000/register", payload)
      .catch(function (error) {
        console.log(error.toJSON());
      });
    if (res) {
      navigate("/login");
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
                id="username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={16} justify="center">
              <TextField
                fullWidth
                id="nombre"
                label="Nombre"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={16} justify="center">
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={16}>
              <TextField
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={16}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={!validateForm()}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
}
