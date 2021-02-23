import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { insereCategoria } from "../common/CategoriaFuncoes";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const emptyFormulario = {
  descricao: "",
};

export default function FormReceitas() {

  const [formulario, setFormulario] = useState(emptyFormulario);
  const classes = useStyles();

  return (
    <div className="Formularios">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="descricao"
          label="Descricao"
          variant="outlined"
          size="small"
          style={{ width: 150 }}
          required={true}
          value={formulario.descricao}
          onChange={(event) =>
            setFormulario({ ...formulario, descricao: event.target.value })
          }
        />

      </form>
      <Button
        variant="contained"
        size="small"
        style={{ margin: 5 }}
        onClick={async () => {
          await insereCategoria(formulario);
         
        }}
      >
        CADASTRAR
      </Button>
    </div>
  );
}
