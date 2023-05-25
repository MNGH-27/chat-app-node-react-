import React from "react";

//component
import Login from "../../components/page/auth/login";
import Signup from "../../components/page/auth/signup";
//picture
import EarthBanner from "./../../assets/images/login_Bg.png";
import WallpaperFlare from "./../../assets/images/wallpaperflare.png";

export default function Auth() {
  return (
    <div className="relative w-screen h-screen text-white Space-Grotesk overflow-hidden">
      <Signup />

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
