import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  insereTransferencia,
  alteraTransferencia,
  getTransferencias,
  formataDadosParaLinhasDataGrid,
} from "../common/TransferenciaFuncoes";
import { Box } from "@material-ui/core";
import {
  emptyFormularioTransferencia,
  emptyAlertState,
} from "../common/EmptyStates";
import Alert from "./Alert";
import {
  retornaStateAlertCadastro,
  AlertWarning,
} from "../common/AlertFuncoes";

import Menu from "./MenuItemForm";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
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

export default function FormTransferencias({
  setFormulario,
  formulario,
  setRows,
  stateAnoAtual,
  stateMesAtual,
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
  let MenuPago = Menu([
    { id: false, descricao: "Aberto" },
    { id: true, descricao: "Pago" },
  ]);
  let TextFieldPago = (
    <TextField
      id="pago"
      label="Pago"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.pago}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, pago: event.target.value })
      }
    >
      {MenuPago}
    </TextField>
  );

  let TextFieldCarteira = (
    <TextField
      id="carteiraOrigem"
      label="Origem"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.carteiraOrigem}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, carteiraOrigem: event.target.value })
      }
    >
      {MenuCarteira}
    </TextField>
  );

  let TextFieldCarteiraDestino = (
    <TextField
      id="carteiraDestino"
      label="Destino"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.carteiraDestino}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, carteiraDestino: event.target.value })
      }
    >
      {MenuCarteira}
    </TextField>
  );

  return (
    <Box className="Formularios">
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />
      <form className={classes.root} noValidate autoComplete="off">
        {TextFieldCarteira}

        {TextFieldCarteiraDestino}

        <TextField
          id="dataTransferencia"
          label="Data"
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formulario.dataTransferencia}
          size="small"
          onChange={(event) =>
            setFormulario({
              ...formulario,
              dataTransferencia: event.target.value,
            })
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

        {TextFieldPago}

        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            let response = 0;
            let transferencias;
            if (formulario.id === 0)
              response = await insereTransferencia(formulario);
            else {
              response = await alteraTransferencia(formulario);
            }

            if (response.statusCode === 200 || response.statusCode === 201) {
              setFormulario(emptyFormularioTransferencia);
            }
            transferencias = await getTransferencias(
              stateAnoAtual,
              stateMesAtual
            );
            setRows(formataDadosParaLinhasDataGrid(transferencias));
            setAlert(
              retornaStateAlertCadastro(
                response.statusCode,
                "Transferencia",
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
            setFormulario(emptyFormularioTransferencia);
          }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
