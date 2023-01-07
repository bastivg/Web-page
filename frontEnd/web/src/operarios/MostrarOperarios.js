import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, Grid } from "@mui/material";
import ResponsiveAppBar from "../ResponsiveAppBar";

export default function Login() {
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const axios = require("axios");

  function validateForm() {
    return password.length > 0 && username.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      username: username,
      password: password,
    };
    console.log(payload);
    const res = await axios
      .post("http://localhost:4000/login", payload)
      .catch(function (error) {
        console.log(error.toJSON());
      });
    if (res) {
     localStorage.setItem("user", username);
    }
    navigate("../MenuPrincipal");
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
                Iniciar sesión
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
}
