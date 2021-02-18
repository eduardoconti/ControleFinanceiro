import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


export default function GroupOrientation() {


    return (

        <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained primary button group"
            variant="contained"
            fullWidth
            
        >
            <Button>Menu 1</Button>
            <Button>Menu 2</Button>
            <Button>Menu 2</Button>
        </ButtonGroup>

    );
}