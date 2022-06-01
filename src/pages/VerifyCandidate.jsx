import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Webcam from "react-webcam";
import QrReader from "../components/QrReader";
import { getCandidateData } from "../utils/firestore";
import { ImCross, ImSpinner3, ImSpinner9 } from "react-icons/im";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcOldTimeCamera } from "react-icons/fc";
import { matchTwoFaces } from "../utils/faceAPI-utils";
import { storeCandidateImage } from "../utils/firebase-storage";
import * as faceapi from "face-api.js";

export default function VerifyCandidate() {
  const [candidateID, setCandidateID] = useState("");
  const [loading, setLoading] = useState(false);
  const [candidateData, setCandidateData] = useState(null);
  const [candidateImageSrc, setCandidateImageSrc] = useState("");
  const notify = (message) => toast(message);
  const handleCandidateDataFetch = useCallback(async () => {
    try {
      if (!candidateID) return;
      console.log(candidateID);
      setLoading(true);
      const res = await getCandidateData(candidateID);
      setCandidateData(res);
    } catch (e) {
      console.log(e);
      notify(e);
    } finally {
      setLoading(false);
    }
  }, [candidateID]);

  const matchFaces = useCallback(
    async (one, two) => {
      if (!candidateImageSrc) return;
      try {
        setLoading(true);
        matchTwoFaces(one, two);
      } catch (e) {
        notify("ERROR: ", e);
      } finally {
        setLoading(false);
      }
    },
    [candidateImageSrc]
  );

  useEffect(() => {
    (async () => {
      const one = document.getElementById("imgOnCampus");
      const two = await faceapi.fetchImage(candidateData?.candidateImageURL);
      console.log(one, two);

      await matchFaces(one, two);
    })();
  }, [matchFaces]);

  useEffect(() => {
    handleCandidateDataFetch();
  }, [handleCandidateDataFetch]);

  return (
    <div className="container m-auto flex flex-col justify-center items-center py-5 min-h-[90vh]">
      <ToastContainer />
      {!candidateID && (
        <>
          <p className="text-lg font-bold">
            Please Show Your QR in front of Camera
          </p>
          <h2>{candidateID && `Your Candidate ID is: ${candidateID}`}</h2>
          <QrReader
            interval={3000}
            onDecodeValue={(val) => setCandidateID(val.slice(1, -1))}
            style={{ padding: "1rem" }}
          />
        </>
      )}
      {loading && (
        <div className="w-full h-screen mx-auto flex flex-col gap-y-10 justify-center items-center">
          <ImSpinner3 className="animate-spin h-56 w-56" />
          <p className="text-lg font-bold">Loading</p>
        </div>
      )}
      {candidateID && candidateData && (
        <div className="flex flex-col justify-center items-center gap-y-5 w-full">
          <p className="text-lg font-bold">
            Hi &nbsp;
            <span className="text-blue-500 text-2xl">
              {candidateData.firstName}
            </span>
            , Show your Face in front of camera
          </p>

          <div className="flex flex-wrap gap-5 w-full p-3">
            <div className="relative flex-1 min-w-[24rem]">
              {candidateImageSrc ? (
                <div className="min-h-[5rem]">
                  <img
                    className="w-full"
                    alt="hello"
                    id="imgOnCampus"
                    src={candidateImageSrc}
                    // crossOrigin="anonymous"
                  />
                  <ImCross
                    className="BaseButton bg-white p-2 absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
                    size={50}
                    color="red"
                    onClick={() => setCandidateImageSrc("")}
                  />
                </div>
              ) : (
                <Webcam className="object-cover w-full px-5">
                  {({ getScreenshot }) => (
                    <FcOldTimeCamera
                      className="BaseButton bg-white p-2 absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
                      size={50}
                      onClick={async () => {
                        let imageSrc = getScreenshot();
                        // imageSrc = await storeCandidateImage(
                        //   imageSrc,
                        //   "data_url",
                        //   `${candidateID}.jpg`
                        // );
                        setCandidateImageSrc(imageSrc);
                      }}
                    />
                  )}
                </Webcam>
              )}
            </div>
            <div className="flex-1 flex justify-center items-center min-w-[24rem]">
              <img
                src={candidateData.candidateImageURL}
                alt=""
                id="imgOnDB"
                className=" w-full object-cover"
                // crossOrigin="anonymous"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
