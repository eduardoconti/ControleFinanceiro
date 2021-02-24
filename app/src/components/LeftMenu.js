import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles({
  botao: {
    backgroundColor: "#F9FEFB",
    width: "100%",
    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
  },
});

export default function LeftMenu({ setStateCurrentBody }) {
  const classes = useStyles();
  function onClick(currentBody) {
    setStateCurrentBody(currentBody);
  }
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={6} lg={12}>
        <Button
          className={classes.botao}
          onClick={() => {
            onClick(2);
          }}
        >
          Categorias
        </Button>
      </Grid>
      <Grid item xs={6} lg={12}>
        <Button className={classes.botao}>Carteiras</Button>
      </Grid>
    </Grid>
  );
}
