import React from "react";
import { Link } from "react-router-dom";

const routs = {
  "add-candidate": "Add Candidate",
  "verify-candidate": "Verify Candidate",
};

export default function Header() {
  return (
    <div className="py-5 px-5 flex bg-gray-100">
      <Link to="/" className="flex-1 text-lg text-blue-500 hover:text-blue-800">
        Home
      </Link>
      {Object.keys(routs).map((item, idx) => (
        <Link
          key={idx}
          to={`/${item}`}
          className="mr-5 text-blue-500 hover:text-blue-800 text-lg"
        >
          {routs[item]}
        </Link>
      ))}
    </div>
  );
}
