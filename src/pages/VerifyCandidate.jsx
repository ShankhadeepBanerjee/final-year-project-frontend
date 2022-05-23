import React, { useState } from "react";
import QrReader from "../components/QrReader";

export default function VerifyCandidate() {
  const [candidateID, setCandidateID] = useState("");
  console.log("Rendering 3");
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Please Show Your QR in front of Camera</h1>
      <h2>{`Your Candidate ID is: ${candidateID}`}</h2>
      <QrReader
        interval={3000}
        onDecodeValue={(val) => setCandidateID(val)}
        style={{ padding: "1rem" }}
      />
    </div>
  );
}
