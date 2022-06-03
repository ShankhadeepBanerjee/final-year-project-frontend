import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { captureElement } from "../utils/capture-dom";
import { getCandidateData } from "../utils/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImSpinner3 } from "react-icons/im";

export default function ShowQr() {
  const { id } = useParams();
  const [candidateData, setCandidateData] = useState({});
  const [loading, setLoading] = useState(true);
  const notify = (message) => toast(message);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getCandidateData(id);
        console.log(res, "XXXXXXXXXX");
        setCandidateData(res);
      } catch (e) {
        notify(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center gap-y-5 bg-white w-full absolute top-0 left-0 h-screen">
      {loading ? (
        <div className="w-full h-screen mx-auto flex flex-col gap-y-10 justify-center items-center">
          <ImSpinner3 className="animate-spin h-56 w-56" />
          <p className="text-lg font-bold">Loading</p>
        </div>
      ) : (
        <>
          <div className="h-16 bg-slate-100 w-full py-3 px-5">
            <Link
              to="/"
              className="flex-1 text-lg text-blue-500 hover:text-blue-800"
            >
              Home
            </Link>
          </div>
          <ToastContainer className="absolute top-0" />
          <p className="font-semibold text-lg">This is Your QR Code</p>

          <div
            id="ADMIT"
            className="bg-white p-5 flex gap-x-5 border-2 border-gray-300 rounded-lg shadow-md"
          >
            <div className="flex-2 flex flex-col justify-around">
              <img
                src={candidateData.candidateImageURL}
                alt=""
                className="h-32 w-32 object-cover"
              />
              <p className="font-semibold">{`Name: ${candidateData.firstName} ${candidateData.lastName}`}</p>
              <p className="font-semibold">{`Instituion: ${candidateData.collegeName}`}</p>
              <p className="font-semibold">{`Roll Number: ${candidateData.rollNumber}`}</p>
              <p className="font-semibold">{`Registration Number: ${candidateData.regNumber}`}</p>
            </div>
            <div className="flex-1">
              <QRCode value={id} />
            </div>
          </div>

          <button
            className="BaseButton bg-blue-500 text-white"
            onClick={() => captureElement(document.getElementById("ADMIT"))}
          >
            Download QR
          </button>

          <span className="flex gap-x-2 items-center">
            <AiFillInfoCircle color="blue" />
            <p className="font-semibold text-sm text-blue-500">
              take a screenshot You will need this for verification
            </p>
          </span>
        </>
      )}
    </div>
  );
}
