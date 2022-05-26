import React, { useState, useRef, useCallback, useEffect } from "react";
import { storeCandidateImage } from "../utils/firebase-storage";
import Modal from "../components/Modal";
import Webcam from "react-webcam";
import { FcOldTimeCamera } from "react-icons/fc";
import { AiFillFolderOpen } from "react-icons/ai";
import { BsFillCameraFill } from "react-icons/bs";
import { FaWindowClose, FaUpload } from "react-icons/fa";
import { ImSpinner6 } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";

const candidateImageSrcInitialState = { url: "", file: null, type: "" };

export default function ImageUploader({ onChange }) {
  const [showModal, setShowModal] = useState(false);
  const [candidateImageSrc, setCandidateImageSrc] = useState(
    candidateImageSrcInitialState
  );
  const [picUploading, setPicUploading] = useState(false);
  const [uploadedImageSrc, setUloadedImageSrc] = useState("");

  const handleUploadCandidateImage = useCallback(async () => {
    try {
      setPicUploading(true);
      const res = await storeCandidateImage(
        candidateImageSrc.file,
        candidateImageSrc.type
      );
      setUloadedImageSrc(res);
      setCandidateImageSrc({ url: "", file: null, type: "" });
      toast("Successfully Uploaded Image");
    } catch (e) {
      toast(e.message);
    } finally {
      setPicUploading(false);
    }
  }, [candidateImageSrc]);

  const uploadRef = useRef(null);

  const handleModalClose = () => setShowModal(false);

  useEffect(() => {
    onChange(uploadedImageSrc);
  }, [uploadedImageSrc]);

  return (
    <div className="flex flex-col gap-y-5 py-5">
      <ToastContainer />

      <div className="shadow-xl relative">
        {(candidateImageSrc.url !== "" || uploadedImageSrc !== "") && (
          <FaWindowClose
            className="absolute top-0 right-0 BaseButton p-0 rounded-[0]"
            size={32}
            color="#f15d"
            onClick={() => {
              setUloadedImageSrc("");
              setCandidateImageSrc(candidateImageSrcInitialState);
            }}
          />
        )}
        {uploadedImageSrc ? (
          <img src={uploadedImageSrc} alt="" />
        ) : (
          <img
            className="rounded-md w-full h-full"
            src={candidateImageSrc.url || "images/upload-placeholder.jpg"}
            alt=""
          />
        )}
      </div>

      <Modal show={showModal} handleClose={handleModalClose}>
        <div className={`h-screen w-full md:h-full bg-gray-400 p-2 rounded-md`}>
          <Webcam className="object-cover w-full h-[90vh] md:h-full">
            {({ getScreenshot }) => (
              <FcOldTimeCamera
                className="BaseButton bg-white p-2 absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
                size={50}
                onClick={() => {
                  handleModalClose();
                  const imageSrc = getScreenshot();
                  setCandidateImageSrc({
                    url: imageSrc,
                    file: imageSrc,
                    type: "data_url",
                  });
                }}
              />
            )}
          </Webcam>
        </div>
      </Modal>

      {!uploadedImageSrc && (
        <div>
          <input
            type="file"
            className="hidden"
            ref={uploadRef}
            onChange={(e) => {
              setCandidateImageSrc({
                url: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0],
                type: "file",
              });
            }}
          />
          {candidateImageSrc.url && (
            <span
              className={`BaseButton inline-flex items-center gap-x-3 bg-green-500 text-white ${
                picUploading && "pointer-events-none opacity-70"
              }`}
              onClick={handleUploadCandidateImage}
            >
              {picUploading ? (
                <ImSpinner6 className="animate-spin" />
              ) : (
                <FaUpload />
              )}
              <p>Upload</p>
            </span>
          )}
          <span
            className={`BaseButton inline-flex items-center gap-x-3 ${
              picUploading && "pointer-events-none opacity-70"
            }`}
            onClick={() => uploadRef.current.click()}
          >
            <AiFillFolderOpen size={20} />
            <span>From Device</span>
          </span>
          <span
            className={`BaseButton inline-flex items-center gap-x-3 ${
              picUploading && "pointer-events-none opacity-70"
            }`}
            onClick={() => setShowModal(true)}
          >
            <BsFillCameraFill size={20} />
            <span>Capture Face</span>
          </span>
        </div>
      )}
    </div>
  );
}
