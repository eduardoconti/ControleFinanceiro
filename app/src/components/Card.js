import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider, Typography } from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
    root: {
        width: '100%',
        textAlign: "center",
        minHeight: 110,
        boxShadow: '0px 0px 5px 1px #9EBFC0',
        backgroundColor: '#F9FEFB',

    },
});

export default function Cards({ descricao, cor, valor, setStateCurrentBody }) {

    const classes = useStyles();

    function onClik() {
        setStateCurrentBody(0)
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Card className={classes.root} variant="outlined">
                <CardActionArea onClick={() => onClik()}>
                    <CardContent style={{  margin:0, padding:0 }} >
                        <Typography variant='h5' style={{ color: cor, paddingTop:5 }}>
                            {descricao}
                        </Typography>
                        <Typography variant='h6' >{valor} R$</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </MuiThemeProvider>
    );
}
