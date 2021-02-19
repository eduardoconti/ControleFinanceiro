
import './App.css';
import Card from './components/Card'
import Grid from './components/DataGrid'
import GridReceitas from './components/DataGridReceitas'
import { retornaTotalDespesasPagas, retornaTotalDespesasAbertas } from './common/DepesaFuncoes'
import { retornaTotalReceitasPagas, retornaTotalReceitasAbertas } from './common/ReceitaFuncoes'
import React, { useState, useEffect } from "react"
import LeftMenu from './components/LeftMenu'

function App() {

  const [totalDespesas, setTotalDespesas] = useState(0)
  const [totalReceitas, setTotalReceitas] = useState(0)
  const [saldo, setSaldo] = useState(0)
  const [balanco, setBalanco] = useState(0)
  const [stateCheckedDespesas, setStateChecked] = useState({
    checkedPago: true,
    checkedAberto: true,
  });

  const [stateCheckedReceitas, setStateCheckedReceita] = useState({
    checkedPago: true,
    checkedAberto: true,
  });

  const [stateCurrentDataGrid, setStateCurrentDataGrid] = useState(0)

  var CurrentDataGrid

  if (stateCurrentDataGrid === 0) {
    CurrentDataGrid =
      <Grid
        setTotalDespesas={(totalDespesas) => setTotalDespesas(totalDespesas)}
        stateCheckedDespesas={stateCheckedDespesas}>

      </Grid>;
  } else if (stateCurrentDataGrid === 1) {
    CurrentDataGrid =
      <GridReceitas
        setTotalReceitas={(totalReceitas) => setTotalReceitas(totalReceitas)}
        stateCheckedReceitas={stateCheckedReceitas} >

      </GridReceitas>
  }

  useEffect(() => {
    async function setTotais() {
      let totalDespesas, totalDespesasPagas, totalDespesasAbertas
      let totalReceitas, totalReceitasPagas, totalReceitasAbertas

      totalDespesas = 0
      totalDespesasPagas = await retornaTotalDespesasPagas()
      totalDespesasAbertas = await retornaTotalDespesasAbertas()

      stateCheckedDespesas.checkedPago ? totalDespesas += totalDespesasPagas : totalDespesas += 0
      stateCheckedDespesas.checkedAberto ? totalDespesas += totalDespesasAbertas : totalDespesas += 0

      totalReceitas = 0
      totalReceitasPagas = await retornaTotalReceitasPagas()
      totalReceitasAbertas = await retornaTotalReceitasAbertas()

      stateCheckedReceitas.checkedPago ? totalReceitas += totalReceitasPagas : totalReceitas += 0
      stateCheckedReceitas.checkedAberto ? totalReceitas += totalReceitasAbertas : totalReceitas += 0

      setTotalDespesas(totalDespesas)
      setTotalReceitas(totalReceitas)
      setSaldo(totalReceitasPagas - totalDespesasPagas)
      setBalanco( totalReceitas - totalDespesas )

    }
    setTotais();
  }
  )
  return (

    <div className="Container" >
      <div className="Left">
        <div className="LeftMenu">
          <LeftMenu />
        </div>
      </div>
      <div className="Middle">
        <div className="Header" >
          <Card descricao='Despesas'
            cor='DarkRed'
            valor={totalDespesas}
            radioButton
            setStateChecked={(stateChecked) => setStateChecked(stateChecked)}
            stateChecked={stateCheckedDespesas}
            setStateCurrentDataGrid={() => setStateCurrentDataGrid(0)}>
          </Card>

          <Card descricao='Receitas'
            cor='green'
            valor={totalReceitas}
            radioButton
            setStateChecked={(stateCheckedReceitas) => setStateCheckedReceita(stateCheckedReceitas)}
            stateChecked={stateCheckedReceitas}
            setStateCurrentDataGrid={() => setStateCurrentDataGrid(1)}>
          </Card>

          <Card descricao='Saldo'
            cor='DarkGoldenRod'
            valor={saldo}>
          </Card>

          <Card descricao='Balanço'
            cor='DarkSlateGrey'
            valor={balanco}>
          </Card>

        </div>
        <div className="Grid">
          {CurrentDataGrid}
        </div>

      </div>
      <div className="Right">
        <div className="Grafico" />
        <div className="Grafico" />
      </div>
    </div>

  );
}

export default App;