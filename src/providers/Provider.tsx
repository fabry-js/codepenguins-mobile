import React, { createContext, useEffect, useState } from "react";

import { auth } from "../auth/firebase";
import { IonToast } from "@ionic/react";

interface ProviderProps {}

export const AuthContext = createContext<any>(null);

export const Provider: React.FC<ProviderProps> = ({children}) => {
  const [ currentUser, setCurrentUser ] = useState<null| any>()
  const [ loading, setLoading] = useState<boolean>()
  const [ showToast, setShowToast] = useState<boolean>(true)

  // const user = localStorage.getItem('email')
  // console.log(user)

  useEffect(()=>{
    auth.onAuthStateChanged((user) =>{
      setCurrentUser(user)
      setLoading(false)
    })
  })

  if(loading)
    return <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message="Contacting our master penguin to log in..." duration={400} />

  return <AuthContext.Provider value={{currentUser}}>
    {children}
  </AuthContext.Provider>;
};
