import React, { useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { AuthContext } from '../../providers/Provider';

const Home: React.FC = () => {
  
  const { currentUser } = useContext(AuthContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText>Hello { currentUser ? currentUser.displayName: '-' }, how are you?</IonText>
      </IonContent>
    </IonPage>
  );
};

export default Home;
