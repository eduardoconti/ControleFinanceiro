import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function Cards({ descricao, cor, valor, setStateCurrentBody }) {
  function onClik() {
    setStateCurrentBody();
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Card
        className="Card"
        variant="outlined"
        style={{ backgroundColor: "#f9fefb" }}
      >
        <CardActionArea onClick={() => onClik()}>
          <CardContent style={{ margin: 0, padding: 0 }}>
            <Typography variant="h5" style={{ color: cor, paddingTop: 5 }}>
              {descricao}
            </Typography>
            <Typography variant="h6">{valor.toFixed(2)} R$</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </MuiThemeProvider>
  );
}
