import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CheckboxLabels from "./CheckBox";
import CardActionArea from "@material-ui/core/CardActionArea";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";
import * as Constants from "../common/Constantes";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


export default function Cards({
  valor,
  setStateChecked,
  stateChecked,
  setStateCurrentBody,
}) {

  function onClik() {
    setStateCurrentBody(Constants.DATA_GRID_DESPESAS);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Card className="Card" variant="outlined" style={{backgroundColor:'#f9fefb'}}>
        <CardActionArea onClick={() => onClik()}>
          <CardContent style={{ margin: 0, padding: 0 }}>
            <Typography
              variant="h5"
              style={{ color: "DarkRed", paddingTop: 5 }}
            >
              Despesas
            </Typography>
            <Typography variant="h6">{valor} R$</Typography>
          </CardContent>
        </CardActionArea>
        <CheckboxLabels
          setStateChecked={setStateChecked}
          stateChecked={stateChecked}
        />
        ;
      </Card>
    </MuiThemeProvider>
  );
}
