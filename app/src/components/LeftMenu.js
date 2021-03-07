import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Ano from "./BotaoAno";
import * as Constants from "../common/Constantes";
import API from "../common/Api";

const useStyles = makeStyles({
  botao: {
    backgroundColor: "#F9FEFB",
    width: "100%",
    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
  },
});

export default function LeftMenu({
  setStateCurrentBody,
  stateAnoAtual,
  setStateAnoAtual,
}) {
  const classes = useStyles();
  function onClick(currentBody) {
    setStateCurrentBody(currentBody);
  }
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={4} lg={12}>
        <Ano
          stateAnoAtual={stateAnoAtual}
          setStateAnoAtual={setStateAnoAtual}
        ></Ano>
      </Grid>

      <Grid item xs={4} lg={12}>
        <Button
          className={classes.botao}
          onClick={() => {
            onClick(Constants.CORPO_CATEGORIAS);
          }}
        >
          Categorias
        </Button>
      </Grid>
      <Grid item xs={4} lg={12}>
        <Button
          className={classes.botao}
          onClick={() => {
            onClick(Constants.CORPO_CARTEIRAS);
          }}
        >
          Carteiras
        </Button>
      </Grid>
      <Grid item xs={4} lg={12}>
        <Button
          className={classes.botao}
          onClick={async () => {
            await API.get("/calc");
          }}
        >
          Calculadora
        </Button>
      </Grid>
    </Grid>
  );
}
