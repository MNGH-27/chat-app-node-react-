import React, { useState } from "react";

//react toastify
import { toast } from "react-toastify";

//react router dom
import { useNavigate } from "react-router-dom";

//component - util
import ChatAppInput from "../../../util/input";
import ChatAppButton from "../../../util/button";

//service
import { GoogleAuthentication, LoginUser } from "../../../../service/auth";

//svg
import { ReactComponent as GoogleSvg } from "./../../../../assets/svg/google.svg";

export default function Login({ onToggleHandler }) {
  //navigate
  const navigate = useNavigate();

  //data schema
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [dataScheam, setDataScheama] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState({});

  const onSetDataScheamHandler = (target, value) => {
    setDataScheama((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  const httpOnLoginUserHandler = async () => {
    setIsBtnLoading(true);

    try {
      const response = await LoginUser(navigate, {
        ...dataScheam,
      });

      if (response.status === 201) {
        navigate("/chat");
      } else {
        //check error type
        if (typeof response.data.message === "string") {
          //show error with taost
          toast.error(response.data.message);
        } else {
          //entred inputs are wrong add it to error data to show to user
          setError({
            ...response.data.message,
          });
        }
      }
    } catch (error) {
      console.log("error in login error:> \n", error);
    }

    setIsBtnLoading(false);
  };

  const httpGoogleAuthentication = async () => {
    try {
      const response = await GoogleAuthentication();

      console.log("response : ", response);
    } catch (error) {
      console.log("error in google authentication\n : ", error);
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
          error={error.name}
          onChangeDataHandler={onSetDataScheamHandler}
        />
        <ChatAppInput
          value={dataScheam.password}
          title={"password"}
          target="password"
          placeholder={"enter your password"}
          type={"password"}
          error={error.password}
          onChangeDataHandler={onSetDataScheamHandler}
        />
      </div>
      <div className="w-full flex flex-col gap-4 mt-6 mb-2">
        <ChatAppButton
          clickHandler={httpOnLoginUserHandler}
          isLoading={isBtnLoading}
          bgColor={"#006CFF"}
          textColor={"#fff"}
        >
          Log in
        </ChatAppButton>
        <button
          onClick={httpGoogleAuthentication}
          className="flex items-center justify-center gap-2 w-full text-white py-2 rounded-3xl text-lg font-semibold border-2 duration-200"
        >
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
