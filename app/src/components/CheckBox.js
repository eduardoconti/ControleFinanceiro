import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from '@material-ui/core/IconButton';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckboxLabels( {setStateChecked, stateChecked, setStateCurrentBody}  ) {

  const handleChange = (event) => { 
    var resultado = 0;
    var name = event.target.name
    function readProp(obj, prop) {
      return obj[prop]
    }  
      
    for (var i in stateChecked) {
      if (stateChecked[i]) {
          resultado ++;
      }
    }
    if ( !( resultado === Object.keys( stateChecked ).length -1 && readProp( stateChecked, name ) ) ){
      setStateChecked({ ...stateChecked, [event.target.name]: event.target.checked })
    }
   
  };

  return (

    <div style={{ alignItems: 'center', justifyContent:'center', display:'flex' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={stateChecked.checkedPago}
            onChange={handleChange}
            name="checkedPago"
            style={{color:'green'}}
          />
        }
        style={{margin:0, padding:0}}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={stateChecked.checkedAberto}
            onChange={handleChange}
            name="checkedAberto"
            style={{color:'DarkRed'}}
          />
        }
        style={{margin:0, padding:0}}
      />
      <IconButton aria-label="inserir"
            style={{ color: '#216260', margin:0, padding:8 }}
            onClick={() => { 
              setStateCurrentBody(2)
              }}>
            <AddCircleTwoToneIcon />
          </IconButton>
    </div>

  );
}
