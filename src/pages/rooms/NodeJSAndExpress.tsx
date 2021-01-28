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
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { auth, firestore } from "../../auth/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./common.css";
import firebase from "firebase";
import placeholders from "./InputPlaceholdersList.json";
import { sendOutline } from "ionicons/icons";

interface NodeJSAndExpressProps {}

const ChatMessage = (props: any) => {
  const { text, uid } = props.message;
  const photoURL: any = auth.currentUser?.photoURL;

  if (uid === auth.currentUser?.uid) {
    return (
      <div>
        <IonChip>
          <IonChip>
            <IonImg src={photoURL} style={{ width: "100%", height: "100%" }} />
          </IonChip>
          <IonLabel>{text}</IonLabel>
        </IonChip>
      </div>
    );
  } else {
    return (
      <div>
        <IonChip>
          <IonLabel>{text}</IonLabel>
        </IonChip>
      </div>
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

    if (text !== "") {
      try {
        await nodeMessagesRef.add({
          text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL,
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
        {messages &&
          messages.map((msg: any) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        <div ref={scrollDummy}></div>

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
