import React, { createContext, useEffect, useState } from "react";
import { emptyChecked } from "../common/EmptyStates";

const ContextChecked = createContext();

function CheckedProvider({ children }) {
    const [stateCheckedDespesas, setStateCheckedDespesas] = useState(emptyChecked);
    const [stateCheckedReceitas, setStateCheckedReceita] = useState(emptyChecked);

  return (
    <Context.Provider
      value={{
        stateCheckedDespesas,
        setStateCheckedDespesas,
        stateCheckedReceitas,
        setStateCheckedReceita
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextChecked, CheckedProvider };
