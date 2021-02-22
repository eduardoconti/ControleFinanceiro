import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Grafico from './Grafico'
export default ({ stateCheckedDespesas, stateCheckedReceitas }) => {
    return (
        <Grid container direction='row' spacing={1} alignItems='center' justify='center'>
            <Grid item xs={12} sm={6} md={6} lg={12}>
                <Box className="Grafico">
                    <Grafico
                        stateCheckedReceitas={stateCheckedReceitas}
                        stateCheckedDespesas={stateCheckedDespesas} >
                    </Grafico>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={12}>
                <Box className="Grafico">
                    <Grafico
                        stateCheckedReceitas={stateCheckedReceitas}
                        stateCheckedDespesas={stateCheckedDespesas}>
                    </Grafico>
                </Box>
            </Grid>

        </Grid>
    )
}