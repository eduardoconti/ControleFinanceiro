import React, { useState, useEffect } from "react";

import GridReceitas from "./DataGridReceitas";
import FormularioReceitas from "./FormReceitas";
import { Grid } from "@material-ui/core";
import { emptyFormularioReceita } from "../common/EmptyStates";
export default function CorpoReceitas({
  stateCheckedDespesas,
  setStateTotais,
  stateCheckedReceitas,
  stateTotais,
  stateMesAtual,
  stateAnoAtual,
}) {
  const [formulario, setFormulario] = useState(emptyFormularioReceita(stateAnoAtual, stateMesAtual));
  useEffect(() => {
    setFormulario(emptyFormularioReceita(stateAnoAtual, stateMesAtual))
  }, [stateMesAtual,stateAnoAtual]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GridReceitas
          stateCheckedReceitas={stateCheckedReceitas}
          setStateTotais={(stateTotais) => {
            setStateTotais(stateTotais);
          }}
          stateCheckedDespesas={stateCheckedDespesas}
          stateTotais={stateTotais}
          setFormulario={(formulario) => setFormulario(formulario)}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
        />
      </Grid>

      <Grid item xs={12}>
        <FormularioReceitas
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
