import React, { useState, useRef, useEffect, useCallback } from "react";

import Modal from "../components/Modal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Webcam from "react-webcam";

import { FcOldTimeCamera } from "react-icons/fc";
import { AiFillFolderOpen } from "react-icons/ai";
import { BsFillCameraFill } from "react-icons/bs";
import { FaWindowClose, FaUpload } from "react-icons/fa";
import { addCandidateInDB } from "../utils/firestore";
import { storeCandidateImage } from "../utils/firebase-storage";
import { ToastContainer, toast } from "react-toastify";
import { ImSpinner6 } from "react-icons/im";

const colleges = ["Others", "ABC college", "DEF college", "GHI college"];

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required please"),
  lastName: yup.string().required("Last Name is required please"),
  rollNumber: yup
    .number()
    .required("Roll Number is required please")
    .typeError("you must specify a number"),
  regNumber: yup
    .number()
    .required("Registration Number is required please")
    .typeError("you must specify a number"),
  collegeName: yup.string().required("College Name is required please"),
});

const candidateImageSrcInitialState = { url: "", file: null, type: "" };
export default function AddCandidate() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showModal, setShowModal] = useState(false);
  const [candidateImageSrc, setCandidateImageSrc] = useState(
    candidateImageSrcInitialState
  );
  const [loading, setLoading] = useState(false);
  const [picUploading, setPicUploading] = useState(false);

  const handleAddCandidateToDb = useCallback(async (data) => {
    try {
      setLoading(true);
      await addCandidateInDB(data);
    } catch (e) {
      toast(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUploadCandidateImage = useCallback(async () => {
    try {
      setPicUploading(true);
      const res = await storeCandidateImage(
        candidateImageSrc.file,
        candidateImageSrc.type
      );
      setCandidateImageSrc((p) => {
        return {
          ...p,
          url: res,
        };
      });
      toast("Successfully Uploaded Image");
    } catch (e) {
      toast(e.message);
    } finally {
      setPicUploading(false);
    }
  }, [candidateImageSrc]);

  const submitForm = (data) => {
    data = {
      ...data,
      id: data.rollNumber,
      candidateFacePicURL: candidateImageSrc.url,
    };
    console.log(data);
    handleAddCandidateToDb(data);
  };

  const uploadRef = useRef(null);

  const handleModalClose = () => setShowModal(false);

  return (
    <div className="container m-auto flex justify-center py-8 px-5">
      <ToastContainer />
      {/* <img
        src="https://firebasestorage.googleapis.com/v0/b/final-year-project-5ca9d.appspot.com/o/images%2Fabc.jpg?alt=media&token=1adeb031-9fe5-4304-b64f-222ec5d5bfc6"
        alt=""
      /> */}
      <form className="w-full max-w-lg" onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              {...register("firstName")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Jane"
            />
            <p className="text-red-500 text-xs italic">
              {errors?.firstName?.message}
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Doe"
            />
            <p className="text-red-500 text-xs italic">
              {errors?.lastName?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Roll Number
            </label>
            <input
              {...register("rollNumber")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
            />
            <p className="text-red-500 text-xs italic">
              {errors?.rollNumber?.message}
            </p>
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              College Registration Number
            </label>
            <input
              {...register("regNumber")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
            />
            <p className="text-red-500 text-xs italic">
              {errors?.regNumber?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              College/School Name
            </label>
            <select
              {...register("collegeName")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              {colleges.map((item, idx) => (
                <option value={item} key={idx}>
                  {item}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-xs italic">
              {errors?.collegeName?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-5 my-10">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="face-capture"
          >
            Candidate Face Picture
          </label>
          <div className="shadow-xl relative">
            {candidateImageSrc.url && (
              <FaWindowClose
                className="absolute top-0 right-0 BaseButton p-0 rounded-[0]"
                size={32}
                color="#f15d"
                onClick={() =>
                  setCandidateImageSrc(candidateImageSrcInitialState)
                }
              />
            )}
            <img
              className="rounded-md w-full h-full"
              src={candidateImageSrc.url || "images/upload-placeholder.jpg"}
              alt=""
            />
          </div>
          <Modal show={showModal} handleClose={handleModalClose}>
            <div
              className={`h-screen w-full md:h-full bg-gray-400 p-2 rounded-md`}
            >
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
              className="BaseButton inline-flex items-center gap-x-3"
              onClick={() => uploadRef.current.click()}
            >
              <AiFillFolderOpen size={20} />
              <span>From Device</span>
            </span>
            <span
              className="BaseButton inline-flex items-center gap-x-3"
              onClick={() => setShowModal(true)}
            >
              <BsFillCameraFill size={20} />
              <span>Capture Face</span>
            </span>
          </div>
        </div>

        <input
          type="submit"
          value="Submit"
          className="BaseButton bg-slate-200"
        />
      </form>
    </div>
  );
}
