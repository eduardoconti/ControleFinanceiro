import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function FormDespesas() {
  const classes = useStyles();

  return (
    <div
      style={{
        width: "100%",
        padding: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="descricao"
          label="Nome"
          variant="outlined"
          size="small"
          required={true}
        />
        <TextField
          id="valor"
          label="Valor"
          variant="outlined"
          size="small"
          style={{ width: 60 }}
        />
        <TextField
          id="sexo"
          label="Sexo"
          variant="outlined"
          size="small"
          select
        >
          <MenuItem value="M">Masculino</MenuItem>
          <MenuItem value="F">Feminino</MenuItem>
          <MenuItem value="O">Outro</MenuItem>
        </TextField>
      </form>
      <Button
        variant="contained"
        size="small"
        style={{ margin: 5 }}
        onClick={async () => {}}
      >
        CADASTRAR
      </Button>
    </div>
  );
}
