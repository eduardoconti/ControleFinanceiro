import React from "react";
import { Grid } from "@material-ui/core";
import GraficoDespesas from "./GraficoDespesas";
import GraficoReceitas from "./GraficoReceitas";
import GraficoMensal from "./GraficoMensal";
export default function GraficosContainer({
  stateCheckedDespesas,
  stateCheckedReceitas,
  stateTotais,
  stateMesAtual,
  stateAnoAtual,
}) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4} md={4} lg={12}>
        <GraficoMensal
          stateTotais={stateTotais}
          stateCheckedDespesas={stateCheckedDespesas}
          stateCheckedReceitas={stateCheckedReceitas}
          stateAnoAtual={stateAnoAtual}
        ></GraficoMensal>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={12}>
        <GraficoReceitas
          stateCheckedReceitas={stateCheckedReceitas}
          stateTotais={stateTotais}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
        ></GraficoReceitas>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={12}>
        <GraficoDespesas
          stateCheckedDespesas={stateCheckedDespesas}
          stateTotais={stateTotais}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
        ></GraficoDespesas>
      </Grid>
    </Grid>
  );
}
