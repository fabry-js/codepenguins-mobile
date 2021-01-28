import * as functions from "firebase-functions";

import Filter = require("bad-words");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.detectEvilUsers = functions.firestore
    .document("node/{msgId}")
    .onCreate(async (doc, _ctx) => {
      const filter = new Filter();
      const {text, uid} = doc.data();

      if (filter.isProfane(text)) {
        const cleaned = filter.clean(text);
        await doc.ref.update({text: `Nope, I can't say that! ${cleaned}`});
        await db.collection("banned").doc(uid).set({});
      }
    });
