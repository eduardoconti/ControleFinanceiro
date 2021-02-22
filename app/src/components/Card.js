import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CheckboxLabels from "./CheckBox";
import CardActionArea from '@material-ui/core/CardActionArea';
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider, Typography } from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
    root: {
        width: '100%',
        textAlign: "center",
        minHeight: 120,
        boxShadow: '0px 0px 5px 1px #9EBFC0',
        backgroundColor: '#F9FEFB',

    }
});

export default function Cards({ descricao, cor, valor, radioButton, setStateChecked, stateChecked, setStateCurrentDataGrid, setIsCadastro, setStateCurrentForm }) {

    const classes = useStyles();
    var checkBox;

    if (radioButton) {
        checkBox = <CheckboxLabels setStateChecked={setStateChecked} stateChecked={stateChecked} setIsCadastro={setIsCadastro} setStateCurrentForm={setStateCurrentForm} />;
    }

    function onClik() {
        setStateCurrentDataGrid()
        setIsCadastro(false)
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Card className={classes.root} variant="outlined">
                <CardActionArea onClick={() => onClik()}>
                    <CardContent style={{  margin:0, padding:0 }} >
                        <Typography variant='h4' style={{ color: cor, paddingTop:5 }}>
                            {descricao}
                        </Typography>
                        <Typography variant='h5' >{valor} R$</Typography>
                    </CardContent>
                </CardActionArea>
                {checkBox}
            </Card>
        </MuiThemeProvider>
    );
}
