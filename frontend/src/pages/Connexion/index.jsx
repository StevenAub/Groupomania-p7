import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" }
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="email" label="E-mail" variant="outlined" />
      <TextField id="username" label="Nom d'utilisateur" variant="outlined" />
      <TextField id="password" label="Mot de passe" variant="outlined" />

      <Button variant="contained">Inscription</Button>
    </Box>
  );
}
