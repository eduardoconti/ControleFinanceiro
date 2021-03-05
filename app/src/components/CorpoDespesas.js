import React, { useState } from "react";

import GridDespesas from "./DataGridDespesas";
import FormularioDespesas from "./FormDespesas";
import { Grid } from "@material-ui/core";
import { emptyFormularioDespesa } from '../common/EmptyStates'
export default function CorpoDespesas({
  stateCheckedDespesas,
  setStateTotais,
  stateCheckedReceitas,
  stateTotais,
  stateMesAtual,
  stateAnoAtual
}) {

  const [formulario, setFormulario] = useState(emptyFormularioDespesa);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GridDespesas
          stateCheckedDespesas={stateCheckedDespesas}
          setStateTotais={(stateTotais) => {
            setStateTotais(stateTotais);
          }}
          stateCheckedReceitas={stateCheckedReceitas}
          stateTotais={stateTotais}
          setFormulario={(formulario) => setFormulario(formulario)}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
        />
      </Grid>

      <Grid item xs={12}>
        <FormularioDespesas
          setStateTotais={(stateTotais) => {
            setStateTotais(stateTotais);
          }}
          stateCheckedDespesas={stateCheckedDespesas}
          stateCheckedReceitas={stateCheckedReceitas}
          formulario={formulario}
          setFormulario={(formulario) => setFormulario(formulario)}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
        />
      </Grid>
    </Grid>
  );
}
