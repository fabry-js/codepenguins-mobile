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

const Settings: React.FC = () => {
  const [logoutToastShown, setLogoutToastShown] = useState<boolean>(false);

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
