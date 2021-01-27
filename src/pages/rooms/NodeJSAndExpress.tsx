import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { auth, firestore } from "../../auth/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import './messages.css'

import placeholders from './InputPlaceholdersList.json'
import { sendOutline } from "ionicons/icons";

interface NodeJSAndExpressProps {}

const ChatMessage = (props: any) =>{
    const { text, uid } = props.message;

    if (uid === auth.currentUser?.uid){
        return (
            <div style={{float: 'right'}}>
                <IonChip >
                    <IonLabel>{text}</IonLabel>
                </IonChip>
            </div>
        )
    } 

    else {
        return (
            <div style={{float: 'left'}}>
                <IonChip >
                    <IonLabel>{text}</IonLabel>
                </IonChip>
            </div>
        )
    }
        
}

const NodeJSAndExpress: React.FC<NodeJSAndExpressProps> = () => {

  const nodeMessagesRef = firestore.collection('node')
  const query = nodeMessagesRef.orderBy('createdAt').limit(25)

  const [ messages ] = useCollectionData(query, { idField: 'id' })
  const [ text, setText ] = useState<string>()

  const randomPlaceholder = Math.floor(Math.random() * placeholders.length)

  const messageSubmit = async (e: any) => {
    e.preventDefault()
    
    const photoURL = auth.currentUser?.photoURL
    const uid = auth.currentUser?.uid
    
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>NodeJS & ExpressJS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {messages && messages.map((msg: any) => <ChatMessage key={msg.id} message={msg}/>)}
      
        <IonItem>
            <form onSubmit={messageSubmit}>
                <IonInput value={text} placeholder={`${placeholders[randomPlaceholder]}`} onIonChange={e => setText(e.detail.value!)} clearInput></IonInput>
                <IonButton type="submit" ><IonIcon icon={sendOutline} /></IonButton>
            </form>
          </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default NodeJSAndExpress;
