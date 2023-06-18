import React, { useState } from "react";

//component - util
import ChatAppInput from "../../../util/input";
import ChatAppButton from "../../../util/button";

//react router dom
import { useNavigate } from "react-router-dom";

//service
import { SignupUser } from "../../../../service/auth";

//svg
import { ReactComponent as GoogleSvg } from "./../../../../assets/svg/google.svg";
import { toast } from "react-toastify";

export default function Signup({ onToggleHandler }) {
  //navigate
  const navigate = useNavigate();

  //data
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [dataScheam, setDataScheama] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const onSetDataScheamHandler = (target, value) => {
    setDataScheama((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  const httpSignupRequest = async () => {
    setIsBtnLoading(true);

    try {
      const response = await SignupUser(navigate, {
        ...dataScheam,
      });

      if (response.status === 201) {
        navigate("/chat");
      } else if (response.status === 400) {
        toast.error("there was error while sign up");
        setError({
          ...response.data.message,
        });
      } else {
        /**
         * !Error in sending signup
         */

        console.log("signup error => status code : ", response.status);
      }
    } catch (error) {
      console.log("error in signup error:> \n", error);
    }

    setIsBtnLoading(false);
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
          value={dataScheam.email}
          title={"email"}
          target="email"
          placeholder={"ex:admin@gmail.com"}
          type={"email"}
          error={error.email}
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
          isLoading={isBtnLoading}
          clickHandler={httpSignupRequest}
          bgColor={"#006CFF"}
          textColor={"#fff"}
        >
          Sign Up
        </ChatAppButton>
        <button className="flex items-center justify-center gap-2 w-full text-white py-2 rounded-3xl text-lg font-semibold border-2 duration-200">
          <GoogleSvg />
          Log in with Google
        </button>
      </div>
      <p className="text-[#A6ABBD] font-semibold text-lg">
        Do you have account ? ,{" "}
        <button onClick={onToggleHandler} className="text-[#006CFF]">
          login to account
        </button>
      </p>
    </div>
  );
}
