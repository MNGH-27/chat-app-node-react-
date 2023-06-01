import React, { useState, useEffect } from "react";

//component
import Login from "../../components/page/auth/login";
import Signup from "../../components/page/auth/signup";
//picture
import EarthBanner from "./../../assets/images/login_Bg.png";
import WallpaperFlare from "./../../assets/images/wallpaperflare.png";
import { CheckNetwork } from "../../service/auth";

export default function Auth() {
  const [status, setStatus] = useState("signup"); //=> 1.signup , 2.login

  useEffect(() => {
    httpReqForGetCheck();
  }, []);

  const onToggleStatusHandler = () => {
    if (status === "signup") {
      setStatus("login");
    } else {
      setStatus("signup");
    }
  };

  const httpReqForGetCheck = async () => {
    try {
      const response = await CheckNetwork();

      console.log("response : ", response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <div className="relative w-screen h-screen text-white Space-Grotesk overflow-hidden">
      {status === "signup" ? (
        <Signup onToggleHandler={onToggleStatusHandler} />
      ) : (
        <Login onToggleHandler={onToggleStatusHandler} />
      )}

      <div>
        <img
          className="absolute bottom-0 right-0 left-0 mx-auto h-3/4 w-full z-10 object-cover"
          src={EarthBanner}
          alt="background"
        />
        <img
          className="absolute bottom-0 right-0 left-0 mx-auto h-full w-full"
          src={WallpaperFlare}
          alt="background"
        />
      </div>
    </div>
  );
}
