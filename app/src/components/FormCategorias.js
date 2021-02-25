import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { insereCategoria, alteraCategoria } from "../common/CategoriaFuncoes";
import { Box } from "@material-ui/core";
import { retornaCategorias } from "../common/CategoriaFuncoes";
import { emptyFormularioCategoria } from "../common/EmptyStates"
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: 'center',
    display: "flex",
    flexWrap: "wrap",
    alignItems: 'center'
  },
  botao: {
    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
    margin: 5
  }
}));

export default function FormCategorias({ setRows, formulario, setFormulario }) {
  const classes = useStyles();
  const descricaoBotao = formulario.id === 0 ? 'CADASTRAR' : 'ALTERAR'
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
          className={classes.botao}
          onClick={async () => {
            if (formulario.id === 0) {
              await insereCategoria(formulario);
            } else {
              await alteraCategoria(formulario)
            }

            setRows(await retornaCategorias())
            setFormulario(emptyFormularioCategoria)
          }}
        >
          {descricaoBotao}
        </Button>

        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            setFormulario(emptyFormularioCategoria)
          }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
