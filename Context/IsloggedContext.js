// context/IsLoggedContext.js
"use client";
import { createContext, useContext, useState } from "react";

const IsLoggedContext = createContext();

export function IsLoggedProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false); // false = not logged in

  return (
    <IsLoggedContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </IsLoggedContext.Provider>
  );
}

export function useIsLogged() {
  return useContext(IsLoggedContext);
}
