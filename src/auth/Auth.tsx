import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { signInWithGoogle } from "../auth/firebase";

import Landscape from '../images/landscape.jpg'
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "../theme/variables.css";
import './Auth.css'
import { useDispatch } from "react-redux";

interface AuthProps {}

const Auth: React.FC<AuthProps> = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const dispatch = useDispatch()

  const submit = () => {
    console.log(`yeah, ${email} ${password}`);
  };

  return (
    <IonPage>
      <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome!</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonCard className="greet-card">
          <IonCardHeader>
            <IonImg src={Landscape} >

            </IonImg>
            <IonCardTitle>
              <h4>Yo!👋, Welcome to Code Penguins!</h4>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Here we spend some time together in our Igloos🐧 chatting about
              code and how we do respect our countries' Covid-19😷 normatives!
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonItem>
            <IonInput
              type="email"
              onIonChange={(e) => setEmail(e.detail.value!)}
              placeholder="E-Mail"
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              type="password"
              onIonChange={(e) => setPassword(e.detail.value!)}
              placeholder="Password"
            ></IonInput>
          </IonItem>

          <IonButton expand="block" onClick={() => submit()}>
            Let's Go!🦜
          </IonButton>
        </IonCard>
        
        <IonCard>
          <IonButton expand="block" onClick={() => signInWithGoogle(dispatch)}>
            Sign In with Google
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Auth;
