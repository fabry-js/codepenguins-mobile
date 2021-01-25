import React, { useCallback, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./Settings.css";
import { auth } from "../../auth/firebase";
// import { useHistory } from "react-router";

const Settings: React.FC = () => {
  const [logoutToastShown, setLogoutToastShown] = useState<boolean>(false);

  // const history = useHistory();

  const handleSignOut = useCallback(
    async () =>
      await auth.signOut().then(() => {
        // history.push("/");
        setLogoutToastShown(true);
      }),
    []
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={handleSignOut}>Sign Out</IonButton>
      </IonContent>
      <IonToast
          color="primary"
          isOpen={logoutToastShown!}
          message="Logout done successfully, see you soon!"
          duration={1800}
        />
    </IonPage>
  );
};

export default Settings;
