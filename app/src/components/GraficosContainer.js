import React from "react";
import { Grid, Box } from "@material-ui/core";
import GraficoDespesas from "./GraficoDespesas";
import GraficoReceitas from "./GraficoReceitas";

export default function GraficosContainer({
  stateCheckedDespesas,
  stateCheckedReceitas,
  stateTotais,
  stateMesAtual,
  stateAnoAtual
}) {
  return (
    <Grid
      container
      spacing={1}
    >
      <Grid item xs={12} sm={6} md={6} lg={12}>
        <Box className="Grafico">
          <GraficoDespesas
            stateCheckedDespesas={stateCheckedDespesas}
            stateTotais={stateTotais}
            stateMesAtual={stateMesAtual}
            stateAnoAtual={stateAnoAtual}
          ></GraficoDespesas>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={12}>
        <Box className="Grafico">
          <GraficoReceitas
            stateCheckedReceitas={stateCheckedReceitas}
            stateTotais={stateTotais}
            stateMesAtual={stateMesAtual}
            stateAnoAtual={stateAnoAtual}
          ></GraficoReceitas>
        </Box>
      </Grid>
    </Grid>
  );
};
