import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
const useStyles = makeStyles({
    botao: {
        backgroundColor: '#F9FEFB',
        maxWidth: '100%',
        minHeight: 35,
        borderRadius: 5,
        textAlign: 'center',

        '&:hover': {
            backgroundColor: '#9Ebfc0',
        },

    },
});

export default function BotaoMes() {
    const classes = useStyles();

    return (
        <Grid container justify='center' spacing={1}>

            <Grid item xs={2} sm={1} lg={1} >
                <CardActionArea className={classes.botao}>JAN</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1}>
                <CardActionArea className={classes.botao}>FEV</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1} >
                <CardActionArea className={classes.botao}>MAR</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1}>
                <CardActionArea className={classes.botao}>ABR</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1}>
                <CardActionArea className={classes.botao}>MAI</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1}>
                <CardActionArea className={classes.botao}>JUN</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1}>
                <CardActionArea className={classes.botao}>JUL</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1}>
                <CardActionArea className={classes.botao}>AGO</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1} >
                <CardActionArea className={classes.botao}>SET</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1}>
                <CardActionArea className={classes.botao}>OUT</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1} >
                <CardActionArea className={classes.botao}>NOV</CardActionArea>
            </Grid>
            <Grid item xs={2} sm={1} lg={1} >
                <CardActionArea className={classes.botao}>DEZ</CardActionArea>
            </Grid>

        </Grid>
    );
}