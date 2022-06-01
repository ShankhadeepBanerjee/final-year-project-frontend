import * as faceapi from "face-api.js";

export const getFaceDiscriptors = async (queryImage) => {
  const singleResult = await faceapi
    .detectSingleFace(queryImage)
    .withFaceLandmarks()
    .withFaceDescriptor();
  return singleResult?.descriptor;
};

export const getFaceMatcher = async (referenceImage) => {
  const results = await getFaceDiscriptors(referenceImage);
  // console.log(results, "res");

  if (!results?.length) {
    return;
  }

  // create FaceMatcher with automatically assigned labels
  // from the detection results for the reference image
  const faceMatcher = new faceapi.FaceMatcher(results);
  return faceMatcher;
};

export const matchTwoFaces = async (img1, img2) => {
  const matcher = await getFaceMatcher(img1);
  const face2Discriptors = await getFaceDiscriptors(img2);

  if (matcher && face2Discriptors) {
    const bestMatch = matcher.findBestMatch(face2Discriptors);
    console.log(bestMatch);
    if (bestMatch.toString().split(" ")[0] === "unknown") {
      console.log("Not Matched");
      return "noMatch";
    } else {
      console.log("Matched");
      return "match";
    }
  } else if (!matcher) {
    console.log("No Face For One");
    return "nofaceOne";
  } else {
    console.log("No Face For Two");
    return "nofaceTwo";
  }
};
