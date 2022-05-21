import React, { useState, useRef } from "react";

import Modal from "../components/Modal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Webcam from "react-webcam";

import { FcOldTimeCamera } from "react-icons/fc";
import { AiFillFolderOpen } from "react-icons/ai";
import { BsFillCameraFill } from "react-icons/bs";
import { FaWindowClose, FaUpload } from "react-icons/fa";

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
  candidateFacePicURL: yup
    .string()
    .required("Please Provide Picture of Your Face."),
});

export default function AddCandidate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);
  };

  const [showModal, setShowModal] = useState(false);
  const [candidateImageSrc, setCandidateImageSrc] = useState("");

  const uploadRef = useRef(null);

  const handleModalClose = () => setShowModal(false);

  return (
    <div className="container flex justify-center py-8 px-5">
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
          <input
            type="text"
            {...register("candidateFacePicURL")}
            className="hidden"
            value={candidateImageSrc}
          />

          <p className="text-red-500 text-xs italic">
            {candidateImageSrc === "" && errors?.candidateFacePicURL?.message}
          </p>
          <div className="shadow-xl relative">
            {candidateImageSrc && (
              <FaWindowClose
                className="absolute top-0 right-0 BaseButton p-0 rounded-[0]"
                size={32}
                color="#f15d"
                onClick={() => setCandidateImageSrc("")}
              />
            )}
            <img
              className="rounded-md w-full h-full"
              src={candidateImageSrc || "images/upload-placeholder.jpg"}
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
                      setCandidateImageSrc(imageSrc);
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
                const imageURL = URL.createObjectURL(e.target.files[0]);
                setCandidateImageSrc(imageURL);
              }}
            />
            {candidateImageSrc && (
              <span className="BaseButton inline-flex items-center gap-x-3 bg-green-500 text-white">
                <FaUpload />
                <p>Upload</p>
              </span>
            )}
            <span
              className="BaseButton inline-flex items-center gap-x-3"
              onClick={() => console.log(uploadRef.current.click())}
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
