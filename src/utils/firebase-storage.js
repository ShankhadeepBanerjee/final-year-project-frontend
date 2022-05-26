import { storage } from "../../firebaseConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

export const storeCandidateImage = async (
  candidateImage,
  type,
  name = "abc.jpg"
) => {
  const spaceRef = ref(storage, `images/${name}`);
  let res;
  if (type === "data_url") {
    res = await uploadString(spaceRef, candidateImage, type);
  } else {
    res = await uploadBytes(spaceRef, candidateImage);
  }
  const url = await getDownloadURL(res.ref);
  return url;
};
