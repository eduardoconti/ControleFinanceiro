
import './App.css';
import Card from './components/Card'
import Grid from './components/DataGrid'
import { retornaTotalDespesas } from './common/DepesaFuncoes'
import React, { useState, useEffect } from "react"
import LeftMenu from './components/LeftMenu'

function App() {

  const [totalDespesas, setTotalDespesas] = useState(0)
  const [totalReceitas, setTotalReceitas] = useState(0)
  const [saldo, setSaldo] = useState(0)

  useEffect(() => {
    retornaTotalDespesas()
      .then((total) => {
        setTotalDespesas(total)
      })
      .catch((error) => {
        console.error("Erro ao retornar TotalDespesas", error.message)
      })

  })
  return (

    <div className="Container" >
      <div className="Left">
       <LeftMenu></LeftMenu>
      </div>
      <div className="Middle">
        <div className="Header" >
          <Card descricao='Despesas' cor='red' valor={totalDespesas} radioButton></Card>
          <Card descricao='Receitas' cor='green' valor={totalReceitas} radioButton></Card>
          <Card descricao='Saldo' cor='yellow' valor={saldo}></Card>
        </div>
        <div className="Grid">
          <Grid></Grid>
        </div>

      </div>
      <div className="Right">
        <div className="Grafico" />
        <div className="Grafico" />
      </div>
      <div className="Foot">

      </div>
    </div>



  );
}

export default App;
