
import './App.css';
import Card from './components/Card'
import Grid from './components/DataGrid'
import GridReceitas from './components/DataGridReceitas'
import { retornaTotalDespesasPagas, retornaTotalDespesasAbertas } from './common/DepesaFuncoes'
import { retornaTotalReceitasPagas, retornaTotalReceitasAbertas } from './common/ReceitaFuncoes'
import React, { useState, useEffect } from "react"
import LeftMenu from './components/LeftMenu'
import FormularioDespesas from './components/FormDespesas'
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
  const [stateCurrentForm, setStateCurrentForm] = useState(0)
  const [ isCadastro, setIsCadastro ] = useState(false)
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

  var CurrentForm 

  if (stateCurrentForm === 0) {
    CurrentForm =
      <FormularioDespesas></FormularioDespesas>
  } else if (stateCurrentForm === 1) {
    CurrentForm =
    <FormularioDespesas></FormularioDespesas>
  }

  var Body 
  if(isCadastro){
    Body = CurrentForm
  }else {
    Body = CurrentDataGrid
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
      setBalanco((totalReceitasAbertas+totalReceitasPagas) - ( totalDespesasPagas + totalDespesasAbertas ))

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
          <Card
            descricao='Despesas'
            cor='DarkRed'
            valor={totalDespesas}
            radioButton
            setStateChecked={(stateChecked) => setStateChecked(stateChecked)}
            stateChecked={stateCheckedDespesas}
            setStateCurrentDataGrid={() => setStateCurrentDataGrid(0)}
            setIsCadastro={(isCadastro)=>setIsCadastro(isCadastro)}>
          </Card>

          <Card
            descricao='Receitas'
            cor='green'
            valor={totalReceitas}
            radioButton
            setStateChecked={(stateCheckedReceitas) => setStateCheckedReceita(stateCheckedReceitas)}
            stateChecked={stateCheckedReceitas}
            setStateCurrentDataGrid={() => setStateCurrentDataGrid(1)}
            setIsCadastro={(isCadastro)=>setIsCadastro(isCadastro)}>
          </Card>

          <Card
            descricao='Saldo'
            cor='DarkGoldenRod'
            valor={saldo}
            setStateCurrentDataGrid={() => setStateCurrentDataGrid(stateCurrentDataGrid)}
            setIsCadastro={(isCadastro)=>setIsCadastro(isCadastro)}>
              
          </Card>

          <Card
            descricao='Balanço'
            cor='DarkSlateGrey'
            valor={balanco}
            setStateCurrentDataGrid={() => setStateCurrentDataGrid(stateCurrentDataGrid)}
            setIsCadastro={(isCadastro)=>setIsCadastro(isCadastro)}>
          </Card>

        </div>
        <div className="Body">
          {Body}
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
