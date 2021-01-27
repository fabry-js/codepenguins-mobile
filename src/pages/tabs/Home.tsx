import React, { useContext } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonList,
  IonChip,
  IonIcon,
} from "@ionic/react";
import "./Home.css";
import { AuthContext } from "../../providers/AuthProvider";
import { logoAndroid, logoAngular, logoApple, logoNodejs, logoReact, logoVue } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";

const Home: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  const textHeaderStyle = {
    marginTop: "10px",
    textAlign: "center",
  };

  return (
    <IonReactRouter>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Hellu {currentUser ? currentUser.displayName : "-"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle style={textHeaderStyle}>Let's pick a room!</IonTitle>
        <IonList style={{marginTop: '10px'}}>
          <IonItem href="/home/node">
            <IonLabel>NodeJS & ExpressJS</IonLabel>
            <IonChip>
              <IonLabel color="success"><IonIcon icon={logoNodejs} ></IonIcon></IonLabel>
            </IonChip>
          </IonItem>
          <IonItem href="#">
            <IonLabel>React & React Native</IonLabel>
            <IonChip>
              <IonLabel color="primary"><IonIcon icon={logoReact} ></IonIcon></IonLabel>
            </IonChip>
          </IonItem>
          <IonItem href="#">
            <IonLabel>Angular</IonLabel>
            <IonChip>
              <IonLabel color="danger"><IonIcon icon={logoAngular} ></IonIcon></IonLabel>
            </IonChip>
          </IonItem>
          <IonItem href="#">
            <IonLabel>Vue & Vue Native</IonLabel>
            <IonChip>
              <IonLabel color="success"><IonIcon icon={logoVue} ></IonIcon></IonLabel>
            </IonChip>
          </IonItem>
          <IonItem href="#">
            <IonLabel>Android development</IonLabel>
            <IonChip>
              <IonLabel color="success"><IonIcon icon={logoAndroid} ></IonIcon></IonLabel>
            </IonChip>
          </IonItem>
          <IonItem href="#">
            <IonLabel>iOS development</IonLabel>
            <IonChip>
              <IonLabel color="white"><IonIcon icon={logoApple} ></IonIcon></IonLabel>
            </IonChip>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
    </IonReactRouter>
  );
};

export default Home;
