import React, { useState } from "react";

//component - util
import ChatAppInput from "./../../../../components/util/input";
import ChatAppButton from "./../../../../components/util/button";

//svg
import { ReactComponent as GoogleSvg } from "./../../../../assets/svg/google.svg";
import { LoginUser } from "../../../../service/auth";

export default function Login({ onToggleHandler }) {
  const [dataScheam, setDataScheama] = useState({
    name: "",
    password: "",
  });

  const onSetDataScheamHandler = (target, value) => {
    setDataScheama((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  const httpOnLoginUserHandler = async () => {
    try {
      const response = await LoginUser({ ...dataScheam });
      console.log("response : ", response);
    } catch (error) {
      console.log("error in login user :", error);
    }
  };

  return (
    <div className="relative z-20 flex items-center justify-center flex-col max-w-sm sm:mx-auto mx-5 mt-10">
      <p className="text-xl font-medium">Welocome back to the chat</p>
      <p className="text-[#A6ABBD]">please enter your detail</p>

      <div className="flex flex-col gap-4 mt-6 w-full">
        <ChatAppInput
          value={dataScheam.name}
          title={"username"}
          target="name"
          placeholder={"ex:mngh-27"}
          type={"text"}
          onChangeDataHandler={onSetDataScheamHandler}
        />
        <ChatAppInput
          value={dataScheam.password}
          title={"password"}
          target="password"
          placeholder={"enter your password"}
          type={"password"}
          onChangeDataHandler={onSetDataScheamHandler}
        />
      </div>
      <div className="w-full flex flex-col gap-4 mt-6 mb-2">
        <ChatAppButton
          clickHandler={httpOnLoginUserHandler}
          bgColor={"#006CFF"}
          textColor={"#fff"}
        >
          Log in
        </ChatAppButton>
        <button className="flex items-center justify-center gap-2 w-full text-white py-2 rounded-3xl text-lg font-semibold border-2 duration-200">
          <GoogleSvg />
          Log in with Google
        </button>
      </div>

      <p className="text-[#A6ABBD] font-semibold text-lg">
        Don't have an account,{" "}
        <button onClick={onToggleHandler} className="text-[#006CFF]">
          sign up for free
        </button>
      </p>
    </div>
  );
}