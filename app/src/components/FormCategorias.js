import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { insereCategoria } from "../common/CategoriaFuncoes";
import { Box } from "@material-ui/core";
import { retornaCategorias } from "../common/CategoriaFuncoes";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent:'center',
    display: "flex",
    flexWrap: "wrap",
    alignItems:'center'
  },
}));

const emptyFormulario = {
  descricao: "",
};

export default function FormCategorias({setRows}) {
  const [formulario, setFormulario] = useState(emptyFormulario);
  const classes = useStyles();

  return (
    <Box className="Formularios">
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
        <Button
          variant="contained"
          size="small"
          style={{ margin: 5 }}
          onClick={async () => {
            await insereCategoria(formulario);
            setRows( await retornaCategorias())
            setFormulario(emptyFormulario)
          }}
        >
          CADASTRAR
        </Button>
      </form>
    </Box>
  );
}
