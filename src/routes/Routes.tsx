import React, { useContext } from "react";
import Auth from "../auth/Auth";
import Tabs from "../pages/Tabs";
import { AuthContext } from "../providers/AuthProvider";

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
  const { currentUser } = useContext(AuthContext);

  return <>{currentUser ? <Tabs /> : <Auth />}</>;
};

export default Routes;
