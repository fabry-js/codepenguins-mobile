import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonPopover,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { auth, firestore } from "../../auth/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./common.css";
import firebase from "firebase";
import placeholders from "./randoms/InputPlaceholdersList.json";
import submitButtonColors from "./randoms/SubmitButtonColors.json";
import { alertCircleOutline, sendOutline } from "ionicons/icons";
import { ChatMessage } from "../ChatMessage";

interface NodeJSAndExpressProps {}

const NodeJSAndExpress: React.FC<NodeJSAndExpressProps> = () => {
  const nodeMessagesRef = firestore.collection("node");
  const reportedMessagesRef = firestore.collection("reported");
  const query = nodeMessagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [text, setText] = useState<string>();
  const [lengthZeroToast, setLengthZeroToast] = useState<boolean>(false);
  const [errorToast, setErrorToast] = useState<boolean>(false);
  const [reportHasBeenSentToast, setReportHasBeenSentToast] = useState<boolean>(false);
  const [reportMessageModal, setReportMessageModal] = useState<boolean>(false);
  const [popoverState, setShowOptionsPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  const randomPlaceholder = Math.floor(Math.random() * placeholders.length);
  const randomSubmitButtonColor = Math.floor(
    Math.random() * submitButtonColors.length
  );

  const reportMessage = async () => {
    const uid = auth.currentUser?.uid;
    const username = auth.currentUser?.displayName;
    const reporterEmail = auth.currentUser?.email;

    try {
      await reportedMessagesRef.add({
        uid,
        username,
        reporterEmail,
        issuedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }).then(() => {
        setReportMessageModal(false);
        setShowOptionsPopover({ showPopover: false, event: undefined })
        setReportHasBeenSentToast(true);
      }).catch(() => {
        setErrorToast(true);
      });
    } catch (err) {
      setErrorToast(true);
    }
  };

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
          username,
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
                <IonItem key={msg.id}>
                  <IonChip
                    onClick={(e: any) => {
                      e.persist();
                      setShowOptionsPopover({ showPopover: true, event: e });
                    }}
                  >
                    <ChatMessage key={msg.id} message={msg} />
                  </IonChip>
                </IonItem>
              );
            })}
          <div ref={scrollDummy}></div>
        </IonList>
        <IonItem className="sendmessageform">
          <form onSubmit={messageSubmit}>
            <IonInput
              value={text}
              placeholder={`${placeholders[randomPlaceholder]}`}
              onIonChange={(e) => setText(e.detail.value?.trim())}
              clearInput
            >
              <IonButton
                color={`${submitButtonColors[randomSubmitButtonColor]}`}
                className="sumbit-button"
                type="submit"
              >
                <IonIcon icon={sendOutline} />
              </IonButton>
            </IonInput>
          </form>
        </IonItem>

        <IonPopover
          event={popoverState.event}
          isOpen={popoverState.showPopover}
          onDidDismiss={() =>
            setShowOptionsPopover({ showPopover: false, event: undefined })
          }
        >
          <IonButton color="danger" onClick={() => setReportMessageModal(true)}>
            <IonIcon icon={alertCircleOutline} /> Report
          </IonButton>
        </IonPopover>

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
        <IonToast
          isOpen={reportHasBeenSentToast}
          duration={3000}
          onDidDismiss={() => setReportHasBeenSentToast(false)}
          color="success"
          message="✅ | A report has been successfully sent. Thank you."
          position="top"
        />
        <IonModal
          isOpen={reportMessageModal}
          onDidDismiss={() => {
            setReportMessageModal(false);
            setShowOptionsPopover({ showPopover: false, event: undefined });
          }}
        >
          <IonHeader>
            <IonButton
              style={{ float: "left", color: "#ff4961" }}
              fill="default"
              color="danger"
            >
              Report Message
            </IonButton>
            <IonButton
              style={{ float: "right" }}
              color="danger"
              onClick={() => setReportMessageModal(false)}
            >
              Close
            </IonButton>
          </IonHeader>
          <IonCard className="reportCard">
            <IonCardHeader>
              <IonCardTitle>Are you sure you want to report?</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                We will be contacting you via email for further informations.
              </p>
            </IonCardContent>
            <IonButton
              color="danger"
              style={{ margin: "0px 0px 0px 120px" }}
              onClick={reportMessage}
            >
              I'm sure.
            </IonButton>
            <IonCardSubtitle>
              <i>
                Note that abusing this functionality might result in a{" "}
                <b>ban.</b>
              </i>
            </IonCardSubtitle>
          </IonCard>
        </IonModal>
      </IonContent>
      <style>{`
          @media screen and (max-width: 740px) {
            .sendmessageform {
              position: fixed;
              bottom: 0;
              height: 22%;
              width: 100%;
              display: flex;
              font-size: 20px;
            }
            .reportCard {
              margin: 0px 0px 500px 0px;
            }
          }
          @media screen and (max-width: 667px) {
            .sendmessageform {
              position: fixed;
              bottom: 0;
              height: 23%;
              width: 100%;
              display: flex;
              font-size: 20px;
            }
            .reportCard {
              margin: 0px 0px 600px 0px;
            }
          }
          @media screen and (max-width: 812px) {
            .sendmessageform {
              position: fixed;
              bottom: 0;
              height: 20%;
              width: 100%;
              display: flex;
              font-size: 20px;
            }
            .reportCard {
              margin: 0px 0px 410px 0px;
            }
          }
          `}</style>
    </IonPage>
  );
};

export default NodeJSAndExpress;
