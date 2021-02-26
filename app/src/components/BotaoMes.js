import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
const useStyles = makeStyles({
  
  botao: {
    backgroundColor: "#F9FEFB",
    maxWidth: "100%",
    minHeight: 36,
    borderRadius: 5,
    textAlign: "center",

    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
    
  },
});

export default function BotaoMes({ setStateMesAtual }) {
  const classes = useStyles();
  function onClick(mesAtual) {
    setStateMesAtual(mesAtual)
  }
  return (
    <Grid container justify="center" spacing={1}>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(1)}>JAN</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(2)}>FEV</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(3)}>MAR</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(4)}>ABR</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(5)}>MAI</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(6)}>JUN</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(7)}>JUL</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(8)}>AGO</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(9)}>SET</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(10)}>OUT</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(11)}>NOV</CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea className={classes.botao} onClick={() => onClick(12)}>DEZ</CardActionArea>
      </Grid>
    </Grid>
  );
}
