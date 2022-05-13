import React from "react";
import { FaWindowClose } from "react-icons/fa";

export default function Modal({ show, handleClose, children }) {
  return (
    <div
      className={`bg-black bg-opacity-50 
      justify-center items-center ${show ? "flex" : "hidden"}
      fixed top-0 left-0 h-full w-full
      `}
    >
      <div className="bg-white min-w-[20rem] min-h-[20rem] relative rounded-md">
        <FaWindowClose
          className="absolute top-0 right-0 BaseButton p-0 rounded-[0]"
          size={32}
          color="#f15d"
          onClick={handleClose}
        />
        {show && children}
      </div>
    </div>
  );
}
