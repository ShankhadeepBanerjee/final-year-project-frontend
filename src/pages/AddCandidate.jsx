import React from "react";

import FaceCapture from "../components/FaceCapture";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    .url()
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

  return (
    <div className="flex justify-center py-8">
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

        <input
          type="submit"
          value="Submit"
          className="BaseButton bg-slate-200"
        />
      </form>
    </div>
  );
}
