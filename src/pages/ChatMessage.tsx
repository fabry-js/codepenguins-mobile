import React from "react";
import { IonChip, IonImg, IonLabel } from "@ionic/react";
import { auth } from "../auth/firebase";

export const ChatMessage = (props: any) => {
  const { text, uid, photoURL } = props.message;

  if (uid === auth.currentUser?.uid) {
    return (
      <>
        <IonChip>
          <IonImg src={photoURL} className="avatar-picture" />
        </IonChip>
        <IonLabel>{text}</IonLabel>
      </>
    );
  } else {
    return (
      <>
        <IonChip>
          <IonImg src={photoURL} className="avatar-picture" />
        </IonChip>
        <IonLabel>{text}</IonLabel>
      </>
    );
  }
};
