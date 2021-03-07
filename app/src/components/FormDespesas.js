import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { retornaCategorias } from "../common/CategoriaFuncoes";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
import { insereDespesa, alteraDespesa } from "../common/DepesaFuncoes";
import { calculaTotais } from "../common/Funcoes";
import { Box } from "@material-ui/core";
import { emptyFormularioDespesa, emptyAlertState } from "../common/EmptyStates";
import Alert from "./Alert";
import {
  retornaStateAlertCadastro,
  AlertWarning,
} from "../common/AlertFuncoes";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  botao: {
    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
    margin: 5,
  },
}));

function Menu(object) {
  return object.map((obj, i) => {
    return (
      <MenuItem key={i} value={obj.id}>
        {obj.descricao}
      </MenuItem>
    );
  });
}

export default function FormDespesas({
  stateCheckedDespesas,
  stateCheckedReceitas,
  setStateTotais,
  setFormulario,
  formulario,
  stateMesAtual,
  stateAnoAtual,
}) {
  const [categorias, setCategorias] = useState([]);
  const [carteiras, setCarteiras] = useState([]);
  const [alert, setAlert] = useState(emptyAlertState);
  const classes = useStyles();
  const descricaoBotao = formulario.id === 0 ? "CADASTRAR" : "ALTERAR";

  useEffect(() => {
    retornaCategorias().then((categorias) => {
      setCategorias(categorias);

      if (categorias.length === 0) {
        setAlert(AlertWarning("Necessário cadastrar categoria"));
      }
    });

    retornaCarteiras().then((carteiras) => {
      setCarteiras(carteiras);
      if (carteiras.length === 0) {
        setAlert(AlertWarning("Necessário cadastrar carteira"));
      }
    });
  }, []);

  let MenuCategoria = Menu(categorias);

  let MenuCarteira = Menu(carteiras);
  let TextFieldCategoria = (
    <TextField
      id="categoria"
      label="Categoria"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.categoria}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, categoria: event.target.value })
      }
    >
      {MenuCategoria}
    </TextField>
  );

  let TextFieldCarteira = (
    <TextField
      id="carteira"
      label="Carteira"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.carteira}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, carteira: event.target.value })
      }
    >
      {MenuCarteira}
    </TextField>
  );

  return (
    <Box className="Formularios">
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />
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
        {TextFieldCategoria}
        {TextFieldCarteira}
        <TextField
          id="vencimento"
          label="Vencimento"
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formulario.vencimento}
          size="small"
          onChange={(event) =>
            setFormulario({ ...formulario, vencimento: event.target.value })
          }
        />
        <TextField
          id="valor"
          label="Valor"
          variant="outlined"
          size="small"
          type="number"
          style={{ width: 120 }}
          value={formulario.valor}
          onChange={(event) =>
            setFormulario({ ...formulario, valor: event.target.value })
          }
        />
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            let response = 0;
            if (formulario.id === 0) {
              response = await insereDespesa(formulario);
            } else {
              response = await alteraDespesa(formulario);
            }

            if (response.statusCode === 200 || response.statusCode === 201) {
              setFormulario(emptyFormularioDespesa);
            }

            setStateTotais(
              await calculaTotais(
                stateCheckedDespesas,
                stateCheckedReceitas,
                stateAnoAtual,
                stateMesAtual
              )
            );
            setAlert(
              retornaStateAlertCadastro(
                response.statusCode,
                "Despesa",
                response.message
              )
            );
          }}
        >
          {descricaoBotao}
        </Button>
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={() => {
            setFormulario(emptyFormularioDespesa);
          }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
