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
        maxHeight: 120,
        boxShadow: '0px 0px 5px 1px #9EBFC0',
        backgroundColor: '#F9FEFB',

    },
});

export default function Cards({ valor, setStateChecked, stateChecked, setStateCurrentBody }) {

    const classes = useStyles();

    function onClik() {
        setStateCurrentBody(1)
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Card className={classes.root} variant="outlined">
                <CardActionArea onClick={() => onClik()}>
                    <CardContent style={{  margin:0, padding:0 }} >
                        <Typography variant='h4' style={{ color: 'green', paddingTop:5 }}>
                            Receitas
                        </Typography>
                        <Typography variant='h5' >{valor} R$</Typography>
                    </CardContent>
                </CardActionArea>
                <CheckboxLabels setStateChecked={setStateChecked} stateChecked={stateChecked} setStateCurrentBody={()=>setStateCurrentBody(3)} />;
            </Card>
        </MuiThemeProvider>
    );
}
