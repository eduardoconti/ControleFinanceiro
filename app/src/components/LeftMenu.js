import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Ano from "./BotaoAno";
import * as Constants from "../common/Constantes";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
const useStyles = makeStyles({
  botao: {
    backgroundColor: "#F9FEFB",
    width: "100%",
    boxShadow: "2px 2px 2px 1px rgba(47, 65, 167, 0.2)",
    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
    fontWeight: "bold",
  },
});

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function LeftMenu({ setStateCurrentBody }) {
  const classes = useStyles();
  function onClick(currentBody) {
    setStateCurrentBody(currentBody);
  }
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={4} lg={12}>
          <Ano />
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
            onClick={() => {
              onClick(Constants.CORPO_TRANSFERENCIAS);
            }}
          >
            Transf.
          </Button>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
