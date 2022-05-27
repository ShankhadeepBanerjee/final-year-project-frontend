import React, { useState, useCallback } from "react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { addCandidateInDB } from "../utils/firestore";

import { ToastContainer, toast } from "react-toastify";
import ImageUploader from "../components/ImageUploader";
import { useNavigate } from "react-router-dom";

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
  candidateImageURL: yup.string().required("Candidate Image is needed"),
});

export default function AddCandidate() {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const handleAddCandidateToDb = useCallback(async (data) => {
    try {
      setLoading(true);
      const uuid = await addCandidateInDB(data);
      toast("Candidate was added successfully");
      navigate(`/show-qr/${uuid}`);
    } catch (e) {
      toast(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitForm = (data) => {
    console.log(data);
    handleAddCandidateToDb(data);
  };

  return (
    <div
      className={`container m-auto flex flex-col justify-center items-center py-8 px-5 ${
        loading && "pointer-events-none opacity-60"
      }`}
    >
      <ToastContainer />
      <form
        className="w-full max-w-lg"
        onSubmit={handleSubmit(submitForm, (e) => console.log(e))}
      >
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

        <Controller
          control={control}
          name="candidateImageURL"
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="face-capture"
                >
                  Candidate Face Picture
                </label>
                <p className="text-red-500 text-xs italic">
                  {error && error?.message}
                </p>
                <ImageUploader onChange={onChange} />
              </>
            );
          }}
        />

        <input
          type="submit"
          value="Submit"
          className="BaseButton bg-slate-200"
        />
      </form>
    </div>
  );
}
