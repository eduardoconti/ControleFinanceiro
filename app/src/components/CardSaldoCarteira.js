import React from "react";
import { Card, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
export default function CardSaldo({ cor, descricao, valor }) {

    return (
        <Card className="Card" variant="outlined" style={{ backgroundColor: '#f9fefb', alignItems:'center', height:70 }} >
            <CardContent style={{ margin: 0, padding: 0 }}>
                <Typography variant="h5" style={{ color: cor, paddingTop: 5 }}>
                    {descricao}
                </Typography>
                <Typography variant="h6">{valor.toFixed(2)} R$</Typography>
            </CardContent>
        </Card>
    )
}