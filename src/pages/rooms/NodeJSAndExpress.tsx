import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { auth, firestore } from "../../auth/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./common.css";
import firebase from "firebase";
import placeholders from "./InputPlaceholdersList.json";
import { sendOutline } from "ionicons/icons";

interface NodeJSAndExpressProps {}

const ChatMessage = (props: any) => {
  const { text, uid, photoURL } = props.message;

  if (uid === auth.currentUser?.uid) {
    return (
        <IonChip>
          <IonChip>
            <IonImg src={photoURL} style={{ width: "100%", height: "100%" }} />
          </IonChip>
          <IonLabel>{text}</IonLabel>
        </IonChip>
    );
  } else {
    return (
        <IonChip>
          <IonChip>
            <IonImg src={photoURL} style={{ width: "100%", height: "100%" }} />
          </IonChip>
          <IonLabel>{text}</IonLabel>
        </IonChip>
    );
  }
};

const NodeJSAndExpress: React.FC<NodeJSAndExpressProps> = () => {
  const nodeMessagesRef = firestore.collection("node");
  const query = nodeMessagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [text, setText] = useState<string>();
  const [lengthZeroToast, setLengthZeroToast] = useState<boolean>(false);
  const [errorToast, setErrorToast] = useState<boolean>(false);

  const randomPlaceholder = Math.floor(Math.random() * placeholders.length);

  const messageSubmit = async (e: any) => {
    e.preventDefault();

    const photoURL = auth.currentUser?.photoURL;
    const uid = auth.currentUser?.uid;
    const username = auth.currentUser?.displayName;

    if (text !== "") {
      try {
        await nodeMessagesRef.add({
          text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL,
          username
        });
      } catch (error) {
        setErrorToast(true);
      }
    } else {
      setLengthZeroToast(true);
    }
    setText("");

    scrollDummy!.current!.scrollIntoView({ behavior: "smooth" });

  };

  const scrollDummy = useRef<null | HTMLDivElement>(null);

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
      <IonContent scrollEvents={true} scrollY={true}>
        <IonList className="messagesList">
          {messages &&
            messages.map((msg: any) => {
            return (
              <IonItem>
                <ChatMessage key={msg.id} message={msg}/>
              </IonItem>
            )
          })}
        <div ref={scrollDummy}></div>
        </IonList>
        <IonItem className="sendmessageform">
          <form onSubmit={messageSubmit}>
            <IonInput
              value={text}
              placeholder={`${placeholders[randomPlaceholder]}`}
              onIonChange={(e) => setText(e.detail.value!)}
              clearInput
            ></IonInput>
            <IonButton expand="block" type="submit">
              <IonIcon icon={sendOutline} />
            </IonButton>
          </form>
        </IonItem>

        <IonToast
          isOpen={lengthZeroToast}
          duration={3000}
          onDidDismiss={() => setLengthZeroToast(false)}
          color="warning"
          message="⚠ | Well, at least type something!"
          position="top"
        />
        <IonToast
          isOpen={errorToast}
          duration={3000}
          onDidDismiss={() => setErrorToast(false)}
          color="danger"
          message="⁉ | Uh-oh something bad occurred, please retry!"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default NodeJSAndExpress;
