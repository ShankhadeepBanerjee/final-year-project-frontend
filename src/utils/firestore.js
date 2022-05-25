import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const addCandidateInDB = async (candidateData) => {
  const candidate = doc(db, `Candidates/${candidateData.id}`);
  const res = await setDoc(candidate, candidateData);
};

export const getCandidateData = async (candidateID) => {
  const docRef = doc(db, "Candidates", candidateID);

  console.log(docRef);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    throw "No such document!";
  }
};
