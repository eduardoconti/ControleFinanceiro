import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    botao: {
        backgroundColor: '#F9FEFB',
    },

});

export default function GroupOrientation() {
    const classes = useStyles();

    return (

        <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained primary button group"
            variant="contained"
            fullWidth
        >
            <Button className={classes.botao}>Menu 1</Button>
            <Button className={classes.botao}>Menu 2</Button>
            <Button className={classes.botao}>Menu 2</Button>
        </ButtonGroup>

    );
}