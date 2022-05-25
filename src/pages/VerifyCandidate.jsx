import React, { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";
import QrReader from "../components/QrReader";
import { getCandidateData } from "../utils/firestore";
import { ImSpinner3, ImSpinner9 } from "react-icons/im";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyCandidate() {
  const [candidateID, setCandidateID] = useState("");
  const [loading, setLoading] = useState(false);
  const [candidateData, setCandidateData] = useState(null);
  const notify = (message) => toast(message);
  const handleCandidateDataFetch = useCallback(async () => {
    try {
      if (!candidateID) return;
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

  useEffect(() => {
    handleCandidateDataFetch();
  }, [handleCandidateDataFetch]);

  return (
    <div className="container m-auto flex flex-col justify-center items-center py-5">
      <ToastContainer />
      {!candidateID && (
        <>
          <p className="text-lg font-bold">
            Please Show Your QR in front of Camera
          </p>
          <h2>{candidateID && `Your Candidate ID is: ${candidateID}`}</h2>
          <QrReader
            interval={3000}
            onDecodeValue={(val) => setCandidateID(val)}
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
        <div className="flex flex-col justify-center items-center gap-y-5">
          <p className="text-lg font-bold">Show your Face in front of camera</p>
          <Webcam />
        </div>
      )}
    </div>
  );
}
