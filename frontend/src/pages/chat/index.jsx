import React from "react";

//component
import ChatSideBar from "../../components/page/chat/sideBar";
import MainChat from "../../components/page/chat/mainChat";

//HOC
import WithUser from "../../components/hoc/withUser";

function Chat({ user }) {
  return (
    <div className="bg-[#12151B] w-screen h-screen overflow-hidden text-white">
      <div className="w-full h-full grid grid-cols-3">
        {/* col-span-1 */}
        <ChatSideBar />

        {/* col-span-2 */}
        <MainChat />
      </div>
    </div>
  );
}

export default WithUser(Chat);
