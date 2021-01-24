import firebase from "firebase";
import { setUser } from "../store/slices/user";

const firebaseConfig = {
    // ding ding dong
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const signInWithGoogle = (dispatch: any) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithRedirect(provider).then((response) => {
    console.log(response);
    dispatch(setUser(response));
  });
};

export const signOut = () => {
  return auth.currentUser && auth.signOut();
};
