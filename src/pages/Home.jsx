import React from "react";

export default function Home() {
  return (
    <div className="container m-auto p-10 flex w-full justify-center align-center gap-y-10 flex-wrap-reverse">
      <div className="flex-1 flex flex-col gap-y-5 text-3xl md:text-6xl min-w-[24rem] text-center md:text-left">
        <div className=" font-bold text-black">Final Year Poject</div>
        <div className=" font-bold text-blue-500">
          Impersonation Detection System
        </div>
        <div className="text-lg text-gray-500 font-semibold md:w-[60%]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
          illo neque illum ipsa, veniam consectetur cum fuga eos iusto dolorum
          consequatur nobis repudiandae. Animi perferendis sapiente ea aut,
          accusamus itaque!
        </div>
        <div className="text-lg mt-10 flex gap-x-10 justify-center md:justify-start">
          <button className="BaseButton bg-blue-700 px-5 text-white">
            Sign Up
          </button>
          <button className="BaseButton bg-white px-5 text-gray-500">
            Login
          </button>
        </div>
      </div>
      <div className="flex-1 min-w-[24rem] flex justify-center items-center">
        <img src="/images/Hero.svg" alt="" className="h-[30vh] md:h-[70vh]" />
      </div>
    </div>
  );
}
