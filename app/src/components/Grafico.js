import React from 'react';
import { Grid, Box } from '@material-ui/core';

export default function Grafico() {
    return (
        <Grid container direction='row' spacing={1} >
            <Grid item  xs={12} sm={6} md={6} lg={12}>
                <Box className="Grafico">
                </Box>
            </Grid>
            <Grid item  xs={12} sm={6} md={6} lg={12}>
                <Box className="Grafico">
                </Box>
            </Grid>

        </Grid>
    )
}