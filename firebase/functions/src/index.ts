/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import {onDocumentUpdated} from 'firebase-functions/v2/firestore'
import * as admin from 'firebase-admin'

admin.initializeApp()

exports.onUpdateUser = onDocumentUpdated("users/{userId}", async (event) => {
  if (event.data) {
    const document = event.data.after.data()
    const userId = event.params.userId

    const db = admin.firestore()
    try {
      const snapshot = await db
      .collectionGroup('reviews').where('user.id', '==', userId).get()

      const batch = db.batch()
      snapshot.docs.forEach((reviewDoc) => {
        const user = {...reviewDoc.data().user, name: document.name}
        batch.update(reviewDoc.ref, {user})
      })
      await batch.commit()
    } catch (err) {
      console.log(err)
    }
  }
})
