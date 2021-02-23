import React from 'react';
import { Grid, Box } from '@material-ui/core';
import GraficoDespesas from './GraficoDespesas';
import GraficoReceitas from './GraficoReceitas';

export default ({ stateCheckedDespesas, stateCheckedReceitas, stateTotais }) => {
    return (
        <Grid container direction='row' spacing={1} alignItems='center' justify='center'>
            <Grid item xs={12} sm={6} md={6} lg={12}>
                <Box className="Grafico">
                    <GraficoDespesas
                        stateCheckedDespesas={stateCheckedDespesas} 
                        stateTotais={stateTotais}>
                    </GraficoDespesas>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={12}>
                <Box className="Grafico">
                    <GraficoReceitas
                        stateCheckedReceitas={stateCheckedReceitas}
                        stateTotais={stateTotais}>
                            
                    </GraficoReceitas>
                </Box>
            </Grid>

        </Grid>
    )
}