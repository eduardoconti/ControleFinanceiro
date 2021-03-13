import React, { useState, useEffect } from "react";
import GridTransferencias from "./DataGridTransferencias";
import FormularioTransferencias from "./FormTransferencias";
import { Grid } from "@material-ui/core";
import { emptyFormularioTransferencia } from "../common/EmptyStates";

export default function Transferencias({ stateMesAtual, stateAnoAtual }) {
  const [formulario, setFormulario] = useState(
    emptyFormularioTransferencia(stateAnoAtual, stateMesAtual)
  );
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setFormulario(emptyFormularioTransferencia(stateAnoAtual, stateMesAtual));
  }, [stateMesAtual, stateAnoAtual]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GridTransferencias
          setFormulario={(formulario) => setFormulario(formulario)}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
          rows={rows}
          setRows={(rows) => setRows(rows)}
        />
      </Grid>

      <Grid item xs={12}>
        <FormularioTransferencias
          formulario={formulario}
          setFormulario={(formulario) => setFormulario(formulario)}
          setRows={(rows) => setRows(rows)}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
        />
      </Grid>
    </Grid>
  );
}
