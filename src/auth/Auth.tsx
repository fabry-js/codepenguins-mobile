import React, { useContext, useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";

import {
  auth,
  googleProvider,
  githubProvider,
  twitterProvider,
} from "../auth/firebase";
import { AuthContext } from "../providers/Provider";
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
import "./Auth.css";

import { useHistory } from "react-router";
import { logoGithub, logoGoogle, logoTwitter } from "ionicons/icons";

const Auth = () => {
  const [ errorToastShown, setErrorToastShown ] = useState<boolean | undefined>();
  const [ successToastShown, setSuccessToastShown ] = useState<
    boolean | undefined
  >();

  const { currentUser } = useContext(AuthContext);

  const history = useHistory();

  const handleGoogleAuth = async () => {
    try {
      await auth.signInWithRedirect(googleProvider);
      setSuccessToastShown(true);
      history.push("/");
    } catch (error) {
      setErrorToastShown(true);
    }
  };
  const handleGitHubAuth = async () => {
    try {
      await auth.signInWithRedirect(githubProvider);
      setSuccessToastShown(true);
      history.push("/");
    } catch (error) {
      setErrorToastShown(true);
    }
  };
  const handleTwitterAuth = async () => {
    try {
      await auth.signInWithRedirect(twitterProvider);
      setSuccessToastShown(true);
      history.push("/");
    } catch (error) {
      setErrorToastShown(true);
    }
  };
  
  useEffect(() => {
    if (currentUser) history.push("/");
  }, [currentUser, history]);


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
          <IonButton expand="block" onClick={handleGoogleAuth}>
            <IonIcon icon={logoGoogle} /> Sign In with Google
          </IonButton>
          <IonButton expand="block" onClick={handleGitHubAuth}>
            <IonIcon icon={logoGithub} /> Sign In with GitHub
          </IonButton>
          <IonButton expand="block" onClick={handleTwitterAuth}>
            <IonIcon icon={logoTwitter} /> Sign In with Twitter
          </IonButton>
        </IonCard>

        <IonToast
          isOpen={successToastShown!}
          message="Login Successful, Yee!"
          duration={1800}
        />
        <IonToast
          isOpen={errorToastShown!}
          message="Oops! Something went wrong during the login! Try again!"
          duration={1800}
        />
      </IonContent>
    </IonPage>
  );
};

export default Auth;
