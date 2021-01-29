import React from "react";
import { Route } from "react-router-dom";
import {
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { settingsOutline, heartOutline, homeOutline } from "ionicons/icons";
import Home from "./tabs/Home";
import Settings from "./tabs/Settings";
import Favourites from "./tabs/Favourites";

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
import Auth from "../auth/Auth";
import NodeJSAndExpress from "./rooms/NodeJSAndExpress";

const Tabs: React.FC = () => {
  return (
    <IonReactRouter>
        <IonPage>
          <IonContent fullscreen>
            <IonText>
              Pick a section below and start exploring, fellow penguin!
            </IonText>
          </IonContent>
        </IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/auth" component={Auth} />
          <Route path="/home" exact={true} component={Home} />
          <Route path="/favourites" component={Favourites} />
          <Route path="/settings" component={Settings} />
          <Route path="/node" render={() => { return <NodeJSAndExpress />}} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="favourites" href="/favourites">
            <IonIcon icon={heartOutline} />
            <IonLabel>Favourites</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Tabs;
