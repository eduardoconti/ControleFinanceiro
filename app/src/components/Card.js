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
        minHeight: 160,
        boxShadow: '0px 0px 5px 1px #9EBFC0',
        margin: 0,
        padding: 0,
        backgroundColor: '#F9FEFB',

    }
});

export default function Cards({ descricao, cor, valor, radioButton, setStateChecked, stateChecked, setStateCurrentDataGrid, setIsCadastro }) {

    const classes = useStyles();
    var checkBox;

    if (radioButton) {
        checkBox = <CheckboxLabels setStateChecked={setStateChecked} stateChecked={stateChecked} setIsCadastro={setIsCadastro} />;
    }

    function onClik() {
        setStateCurrentDataGrid()
        setIsCadastro(false)
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Card className={classes.root} variant="outlined">
                <CardActionArea
                    onClick={() => onClik()}	>
                    <CardContent >
                        <Typography variant='h4' style={{ color: cor }}>
                            {descricao}
                        </Typography>
                        <Typography variant='h5'>{valor} R$</Typography>
                    </CardContent>
                </CardActionArea>
                {checkBox}
            </Card>
        </MuiThemeProvider>
    );
}
