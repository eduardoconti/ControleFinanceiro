import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, Button } from "@material-ui/core";
import { ObtemToken } from "../common/Login";
import Alert from "./Alert";
import { login, logout } from "../common/Auth";
import {
  emptyFormularioCarteira,
  emptyAlertState,
} from "../common/EmptyStates";
import {Context} from '../Context/AuthContext';
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  botao: {
    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
    margin: 5,
  },
}));

export default function FormLogin( {setOpen, setLogged}) {
    const [formulario, setFormulario] = useState({ username:'', password:''}
      );  
  const classes = useStyles();
  const [alert, setAlert] = useState(emptyAlertState);
  const ctx = useContext(Context);
  return (
    <Box className="Formularios">
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="username"
          label="username"
          variant="outlined"
          size="small"
          style={{ width: 180 }}
          required={true}
          value={formulario.username}
          onChange={(event) =>
            setFormulario({ ...formulario, username: event.target.value })
          }
        />
         <TextField
          id="password"
          label="password"
          variant="outlined"
          size="small"
          style={{ width: 180 }}
          required={true}
          value={formulario.password}
          onChange={(event) =>
            setFormulario({ ...formulario, password: event.target.value })
          }
        />

        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {

            console.log(formulario)
            let token = await ObtemToken(formulario);

            if(token){
                login(token);
                setOpen(false);
                setLogged(true);              
                ctx.setToken(token);
            }
            setFormulario(emptyFormularioCarteira);          
          }}
        >
          LOGIN
        </Button>

        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            logout();
            setLogged(false);
            setOpen(false);
          }}
        >
          logout
        </Button>
      </form>
    </Box>
  );
}
