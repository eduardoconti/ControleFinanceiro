import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
import { insereReceita, alteraReceita } from "../common/ReceitaFuncoes";
import { calculaTotais } from "../common/Funcoes";
import { Box } from "@material-ui/core";
import { emptyFormularioReceita, emptyAlertState } from "../common/EmptyStates";
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

export default function FormReceitas({
  stateCheckedDespesas,
  stateCheckedReceitas,
  setStateTotais,
  setFormulario,
  formulario,
  stateMesAtual,
  stateAnoAtual,
}) {
  const [carteiras, setCarteiras] = useState([]);
  const classes = useStyles();
  const descricaoBotao = formulario.id === 0 ? "CADASTRAR" : "ALTERAR";
  const [alert, setAlert] = useState(emptyAlertState);

  useEffect(() => {
    retornaCarteiras().then((carteiras) => {
      setCarteiras(carteiras);

      if (carteiras.length === 0) {
        setAlert(AlertWarning("Necessário cadastrar carteira"));
      }
    });
  }, []);

  let MenuCarteira = Menu(carteiras);

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

        {TextFieldCarteira}
        <TextField
          id="pagamento"
          label="Pagamento"
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formulario.pagamento}
          size="small"
          onChange={(event) =>
            setFormulario({ ...formulario, pagamento: event.target.value })
          }
        />

        <TextField
          id="valor"
          label="Valor"
          variant="outlined"
          size="small"
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
            if (formulario.id === 0) response = await insereReceita(formulario);
            else {
              response = await alteraReceita(formulario);
            }

            if (response.statusCode === 200 || response.statusCode === 201) {
              setFormulario(emptyFormularioReceita);
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
                "Receita",
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
            setFormulario(emptyFormularioReceita);
          }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
