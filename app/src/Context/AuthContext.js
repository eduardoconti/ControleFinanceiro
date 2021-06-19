import React, { createContext } from "react";

const Context = createContext();

function AuthProvider({ children, userId }) {
  return (
    <Context.Provider
      value={{
        userId: userId,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
