import "./App.css";
import Card from "./components/Card";
import { calculaTotais } from "./common/Funcoes";
import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import LeftMenu from "./components/LeftMenu";
import GraficosContainer from "./components/GraficosContainer";
import BotaoMes from "./components/BotaoMes";
import Corpo from "./components/Corpo";
import CardDespesas from "./components/CardDespesas";
import CardReceitas from "./components/CardReceitas";
import { emptyTotais, emptyChecked } from "./common/EmptyStates";
import * as Constantes from './common/Constantes';

function App() {
  const [stateTotais, setStateTotais] = useState(emptyTotais);
  const [stateCheckedDespesas, setStateChecked] = useState(emptyChecked);
  const [stateCheckedReceitas, setStateCheckedReceita] = useState(emptyChecked);
  const [stateCurrentBody, setStateCurrentBody] = useState(0);
  const [stateMesAtual, setStateMesAtual ] = useState( new Date().getMonth() +1 )

  useEffect(() => {
    async function setTotais() {
      setStateTotais(
        await calculaTotais(stateCheckedDespesas, stateCheckedReceitas, stateMesAtual)
      );
    }
    setTotais();
  }, [stateCheckedDespesas, stateCheckedReceitas, stateMesAtual]);

  return (
    <Box className="Container">
      <Grid container direction="row" spacing={1} justify="center">
        <Grid item xs={12}>
          {/* HEADER */}
          <Box className="Header"/>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
          {/* LEFT */}
          <LeftMenu
            setStateCurrentBody={(currentBody) =>
              setStateCurrentBody(currentBody)
            }
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={7} xl={6}>
          {/* MID */}
          <Grid container spacing={1}>
            <Grid container item spacing={1}>
              {/* BOTOES MESES */}
              <Grid item xs={12}>
                <BotaoMes setStateMesAtual={ (stateMesAtual)=>setStateMesAtual(stateMesAtual)}/>
              </Grid>
            </Grid>

            <Grid container item spacing={1}>
              {/* CARDS */}
              <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
                <CardDespesas
                  valor={stateTotais.totalDespesas}
                  setStateChecked={(stateChecked) =>
                    setStateChecked(stateChecked)
                  }
                  stateChecked={stateCheckedDespesas}
                  setStateCurrentBody={(currentBody) =>
                    setStateCurrentBody(currentBody)
                  }
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
                <CardReceitas
                  valor={stateTotais.totalReceitas}
                  setStateChecked={(stateCheckedReceitas) =>
                    setStateCheckedReceita(stateCheckedReceitas)
                  }
                  stateChecked={stateCheckedReceitas}
                  setStateCurrentBody={(currentBody) =>
                    setStateCurrentBody(currentBody)
                  }
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
                <Card
                  descricao="Saldo"
                  cor="DarkGoldenRod"
                  valor={stateTotais.saldo}
                  setStateCurrentBody={() =>
                    setStateCurrentBody(Constantes.CORPO_SALDO)
                  }
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
                <Card
                  descricao="Balanço"
                  cor="DarkSlateGrey"
                  valor={stateTotais.balanco}
                  setStateCurrentBody={(currentBody) =>
                    setStateCurrentBody(currentBody)
                  }
                />
              </Grid>
            </Grid>

            <Grid container item spacing={1}>
              {/* BODY ( FORM, GRID...) */}
              <Grid item xs={12}>
                <Corpo
                  stateCurrentBody={stateCurrentBody}
                  stateCheckedDespesas={stateCheckedDespesas}
                  setStateTotais={(stateTotais) => {
                    setStateTotais(stateTotais);
                  }}
                  stateCheckedReceitas={stateCheckedReceitas}
                  stateTotais={stateTotais}
                  stateMesAtual={stateMesAtual}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={4} xl={5} >
          {/* RIGHT */}
          <GraficosContainer
            stateCheckedDespesas={stateCheckedDespesas}
            stateTotais={stateTotais}
            stateCheckedReceitas={stateCheckedReceitas} 
            stateMesAtual={stateMesAtual}/>
        </Grid>

        <Grid item xs={12}>
          {/* FOOTER */}
          {/*<Box className="Footer" />*/}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
