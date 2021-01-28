import React from 'react';
import { Provider as AuthProvider } from "./AuthProvider";
import Routes from "../routes/Routes";

interface ProvidersProps {}

const Providers: React.FC<ProvidersProps> = () =>{
        return (
            <AuthProvider>
                <Routes />
            </AuthProvider>
        ); 
}

export default Providers