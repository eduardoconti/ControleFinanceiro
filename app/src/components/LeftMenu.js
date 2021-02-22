import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from '@material-ui/core';
const useStyles = makeStyles({
    botao: {
        backgroundColor: '#F9FEFB',
        width:'100%'
    },

});

export default function LeftMenu() {
    const classes = useStyles();

    return (
        <Grid container direction='row' spacing={1} >

            <Grid item xs={4} lg={12}>
                <Button className={classes.botao}>Menu 1</Button>
            </Grid>
            <Grid item xs={4} lg={12}>
                <Button className={classes.botao}>Menu 2</Button>
            </Grid>
            <Grid item xs={4} lg={12}>
                <Button className={classes.botao}>Menu 3</Button>
            </Grid>
        </Grid>
    );
}