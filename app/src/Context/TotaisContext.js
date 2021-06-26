import React, { createContext, useEffect, useState } from "react";
import { emptyTotais } from "../common/EmptyStates";

const ContextTotais = createContext();

function TotaisProvider({ children }) {
const [stateTotais, setStateTotais] = useState(emptyTotais);

  return (
    <Context.Provider
      value={{
        stateTotais,
        setStateTotais
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextTotais, TotaisProvider };
