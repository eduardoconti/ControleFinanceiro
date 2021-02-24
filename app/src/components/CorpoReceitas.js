import React from "react";

import GridReceitas from "./DataGridReceitas";
import FormularioReceitas from "./FormReceitas";
import { Grid } from "@material-ui/core";
export default function CorpoReceitas({
  stateCheckedDespesas,
  setStateTotais,
  stateCheckedReceitas,
  stateTotais,
}) {
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
        />
      </Grid>

      <Grid item xs={12}>
        <FormularioReceitas
          setStateTotais={(stateTotais) => {
            setStateTotais(stateTotais);
          }}
          stateCheckedDespesas={stateCheckedDespesas}
          stateCheckedReceitas={stateCheckedReceitas}
        />
      </Grid>
    </Grid>
  );
}
