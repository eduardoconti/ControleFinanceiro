import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CheckboxLabels from "./CheckBox";

const useStyles = makeStyles({
    root: {
        width: 200,
        textAlign: "center",
        minHeight: 160,
        display: "flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:'center',
        boxShadow:'0px 0px 5px 3px #9EBFC0'
     

    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cabecalho: {
        fontSize: 26,
        fontWeight: "bold",
    },
    valor: {
        fontSize: 32,
        fontWeight: "bold",
    },
    checkBox: {
        justifyContent: "center",
        display: "flex",
        alignItens: "center",
    },
});

export default function Cards({ descricao, cor, valor, radioButton }) {
    const classes = useStyles();
    var checkBox;

    if (radioButton) {
        checkBox = <CheckboxLabels className={classes.checkBox}/>;
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent > 
                <Typography className={classes.cabecalho} style={{ color: cor }}>
                    {descricao}
                </Typography>

                <Typography className={classes.valor}>{valor} R$</Typography>
            </CardContent>
            {checkBox}
        </Card>
    );
}
