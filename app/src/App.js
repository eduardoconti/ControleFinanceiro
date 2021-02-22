
import './App.css';
import Card from './components/Card'
import GridDespesas from './components/DataGridDespesas'
import GridReceitas from './components/DataGridReceitas'
import { calculaTotais } from './common/Funcoes'
import React, { useState, useEffect } from "react"
import FormularioDespesas from './components/FormDespesas'
import { Grid, Box } from '@material-ui/core';
import LeftMenu from './components/LeftMenu'
import Grafico from './components/Grafico'

function App() {

  const [stateTotais, setStateTotais] = useState({
    totalDespesas: 0,
    totalReceitas: 0,
    saldo: 0,
    balanco: 0
  })

  const [stateCheckedDespesas, setStateChecked] = useState({
    checkedPago: true,
    checkedAberto: true,
  });

  const [stateCheckedReceitas, setStateCheckedReceita] = useState({
    checkedPago: true,
    checkedAberto: true,
  });

  const [stateCurrentDataGrid, setStateCurrentDataGrid] = useState(0)
  const [stateCurrentForm, setStateCurrentForm] = useState(0)
  const [isCadastro, setIsCadastro] = useState(false)

  var CurrentDataGrid

  if (stateCurrentDataGrid === 0) {
    CurrentDataGrid = <GridDespesas
      stateCheckedDespesas={stateCheckedDespesas}
      setStateTotais={(stateTotais) => { setStateTotais(stateTotais) }}
      stateTotais={stateTotais} />

  } else if (stateCurrentDataGrid === 1) {
    CurrentDataGrid = <GridReceitas stateCheckedReceitas={stateCheckedReceitas}
      setStateTotais={(stateTotais) => { setStateTotais(stateTotais) }}
      stateTotais={stateTotais} />
  }

  var CurrentForm

  if (stateCurrentForm === 0) {
    CurrentForm = <FormularioDespesas />

  } else if (stateCurrentForm === 1) {
    CurrentForm = <FormularioDespesas />
  }

  var Body

  if (isCadastro) {
    Body = CurrentForm
  } else {
    Body = CurrentDataGrid
  }

  useEffect(() => {
    async function setTotais() {
      setStateTotais(await calculaTotais(stateCheckedDespesas, stateCheckedReceitas))
    }
    setTotais();
  }, [stateCheckedDespesas, stateCheckedReceitas]
  )
  return (

    <Box className="Container">

      <Grid container direction='row' spacing={1}>

        <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>{/* LEFT */}
          <LeftMenu></LeftMenu>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}> {/* MID */}

          <Grid container spacing={1} >
            <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
              <Card
                descricao='Despesas'
                cor='DarkRed'
                valor={stateTotais.totalDespesas}
                radioButton
                setStateChecked={(stateChecked) => setStateChecked(stateChecked)}
                stateChecked={stateCheckedDespesas}
                setStateCurrentDataGrid={() => setStateCurrentDataGrid(0)}
                setIsCadastro={(isCadastro) => setIsCadastro(isCadastro)}>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
              <Card
                descricao='Receitas'
                cor='green'
                valor={stateTotais.totalReceitas}
                radioButton
                setStateChecked={(stateCheckedReceitas) => setStateCheckedReceita(stateCheckedReceitas)}
                stateChecked={stateCheckedReceitas}
                setStateCurrentDataGrid={() => setStateCurrentDataGrid(1)}
                setIsCadastro={(isCadastro) => setIsCadastro(isCadastro)}>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
              <Card
                descricao='Saldo'
                cor='DarkGoldenRod'
                valor={stateTotais.saldo}
                setStateCurrentDataGrid={() => setStateCurrentDataGrid(stateCurrentDataGrid)}
                setIsCadastro={(isCadastro) => setIsCadastro(isCadastro)}>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={3} xl={3} >
              <Card
                descricao='Balanço'
                cor='DarkSlateGrey'
                valor={stateTotais.balanco}
                setStateCurrentDataGrid={() => setStateCurrentDataGrid(stateCurrentDataGrid)}
                setIsCadastro={(isCadastro) => setIsCadastro(isCadastro)}>
              </Card>
            </Grid>
            
          </Grid>

          <Grid container spacing={1} >
            <Grid item xs={12} >
              {Body}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}> {/* RIGHT */}
         <Grafico></Grafico>
        
        </Grid>

      </Grid>
    </Box>
  );
}

export default App;
