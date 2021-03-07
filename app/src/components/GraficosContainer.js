import React from "react";
import { Grid } from "@material-ui/core";
import GraficoDespesas from "./GraficoDespesas";
import GraficoReceitas from "./GraficoReceitas";

export default function GraficosContainer({
  stateCheckedDespesas,
  stateCheckedReceitas,
  stateTotais,
  stateMesAtual,
  stateAnoAtual,
}) {
  return (
    <Grid container item spacing={1}>
      <Grid item xs={12} sm={6} md={6} lg={12}>
        <GraficoDespesas
          stateCheckedDespesas={stateCheckedDespesas}
          stateTotais={stateTotais}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
        ></GraficoDespesas>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={12}>
        <GraficoReceitas
          stateCheckedReceitas={stateCheckedReceitas}
          stateTotais={stateTotais}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
        ></GraficoReceitas>
      </Grid>
    </Grid>
  );
}
