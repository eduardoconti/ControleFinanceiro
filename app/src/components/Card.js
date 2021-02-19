import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CheckboxLabels from "./CheckBox";
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
    root: {
        width: 180,
        textAlign: "center",
        minHeight: 160,
        boxShadow: '0px 0px 5px 1px #9EBFC0',
        flexDirection: 'row',
        margin: 0,
        padding: 0

    },
    cabecalho: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: 'Arial',
    },
    valor: {
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: "bold",
    },
    checkBox: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default function Cards({ descricao, cor, valor, radioButton, setStateChecked, stateChecked, setStateCurrentDataGrid }) {

    const classes = useStyles();
    var checkBox;

    if (radioButton) {
        checkBox = <CheckboxLabels setStateChecked={setStateChecked} stateChecked={stateChecked} />;
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardActionArea 
            onClick={ setStateCurrentDataGrid }	>
                <CardContent >
                    <Typography className={classes.cabecalho} style={{ color: cor }}>
                        {descricao}
                    </Typography>
                    <Typography className={classes.valor}>{valor} R$</Typography>
                </CardContent>
            </CardActionArea>
            {checkBox}
        </Card>
    );
}
