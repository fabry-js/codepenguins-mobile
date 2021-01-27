import React, { createContext, useEffect, useState } from "react";

import { auth } from "../auth/firebase";

interface ProviderProps {}

export const AuthContext = createContext<any>(null);

export const Provider: React.FC<ProviderProps> = ({children}) => {
  const [ currentUser, setCurrentUser ] = useState<null| any>()

  // const user = localStorage.getItem('email')
  // console.log(user)

  useEffect(()=>{
    auth.onAuthStateChanged((user) =>{
      setCurrentUser(user)
    })
  })
  
  return <AuthContext.Provider value={{currentUser}}>
    {children}
  </AuthContext.Provider>;
};
