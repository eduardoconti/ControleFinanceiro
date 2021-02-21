
import './App.css';
import Card from './components/Card'
import Grid from './components/DataGridDespesas'
import GridReceitas from './components/DataGridReceitas'
import { calculaTotais } from './common/Funcoes'
import React, { useState, useEffect } from "react"
import LeftMenu from './components/LeftMenu'
import FormularioDespesas from './components/FormDespesas'
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
    CurrentDataGrid = <Grid stateCheckedDespesas={stateCheckedDespesas} />

  } else if (stateCurrentDataGrid === 1) {
    CurrentDataGrid = <GridReceitas stateCheckedReceitas={stateCheckedReceitas} />
  }

  var CurrentForm

  if (stateCurrentForm === 0) {
    CurrentForm =  <FormularioDespesas/>
     
  } else if (stateCurrentForm === 1) {
    CurrentForm = <FormularioDespesas/>    
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
            valor={stateTotais.totalDespesas}
            radioButton
            setStateChecked={(stateChecked) => setStateChecked(stateChecked)}
            stateChecked={stateCheckedDespesas}
            setStateCurrentDataGrid={() => setStateCurrentDataGrid(0)}
            setIsCadastro={(isCadastro) => setIsCadastro(isCadastro)}>
          </Card>

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

          <Card
            descricao='Saldo'
            cor='DarkGoldenRod'
            valor={stateTotais.saldo}
            setStateCurrentDataGrid={() => setStateCurrentDataGrid(stateCurrentDataGrid)}
            setIsCadastro={(isCadastro) => setIsCadastro(isCadastro)}>

          </Card>

          <Card
            descricao='Balanço'
            cor='DarkSlateGrey'
            valor={stateTotais.balanco}
            setStateCurrentDataGrid={() => setStateCurrentDataGrid(stateCurrentDataGrid)}
            setIsCadastro={(isCadastro) => setIsCadastro(isCadastro)}>
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
