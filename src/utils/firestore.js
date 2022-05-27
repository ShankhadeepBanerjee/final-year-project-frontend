import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const addCandidateInDB = async (candidateData) => {
  const docRef = await addDoc(collection(db, "Candidates"), candidateData);
  return docRef.id;
};

export const getCandidateData = async (candidateID) => {
  const docRef = doc(db, "Candidates", candidateID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    throw "No such document!";
  }
};
