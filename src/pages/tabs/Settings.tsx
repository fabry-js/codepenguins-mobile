import React, { useCallback, useState } from "react";
import {
  IonButton,
  IonContent,
  IonList,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Settings.css";
import { auth } from "../../auth/firebase";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

const Settings: React.FC = () => {
  const [logoutToastShown, setLogoutToastShown] = useState<boolean>(false);
  const {currentUser} = useContext(AuthContext);

  const handleSignOut = useCallback(async () => {
    await auth.signOut();
    setLogoutToastShown(true);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList style={{ marginTop: "10px" }}>
          <IonItem>
            <IonLabel>Logout</IonLabel>
            <IonButton color="success" fill="outline" onClick={handleSignOut}>Logout</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Current User Account</IonLabel>
            <IonButton fill="clear" color="success">{currentUser.displayName}</IonButton>
          </IonItem>
        </IonList>
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
