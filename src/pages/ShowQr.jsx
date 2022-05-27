import React from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ShowQr() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center gap-y-5 bg-white w-full absolute top-0 left-0 h-screen">
      <div className="h-16 bg-slate-100 w-full py-3 px-5">
        <Link
          to="/"
          className="flex-1 text-lg text-blue-500 hover:text-blue-800"
        >
          Home
        </Link>
      </div>
      <p className="font-semibold text-lg">This is Your QR Code</p>

      <QRCode value={id} />
      <span className="flex gap-x-2 items-center">
        <AiFillInfoCircle color="blue" />
        <p className="font-semibold text-sm text-blue-500">
          take a screenshot You will need this for verification
        </p>
      </span>
    </div>
  );
}
