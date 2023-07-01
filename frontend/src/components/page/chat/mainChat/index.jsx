//HOC
import { useEffect } from "react";
import WithReceiver from "../../../hoc/withReceiver";

//Svg
import { ReactComponent as ArrowRight2 } from "./../../../../assets/svg/arrowRight(2).svg";

//socket-io
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function MainChat({ receiver }) {
  return (
    <div className="col-span-2 flex flex-col border-l border-[#004CCC]">
      <div className="p-3 border-b border-[#004CCC] flex items-center justify-between w-full">
        <span className="text-xl">{receiver.name}</span>
        <span className="text-sm text-[#8A898E]">last seen recently</span>
      </div>

      <div className="h-full p-3">
        <EmptyChat />
      </div>

      <div className="p-2 border-t border-[#004CCC] flex items-center justify-between gap-3 w-full">
        <textarea
          className="w-full bg-[#0C0E12] h-[65px] resize-none outline-none rounded-md placeholder:text-[#43527C] p-2"
          placeholder="Say something"
        />
        <button className="bg-[#1C1F27] text-[#004CCC] hover:bg-[#004CCC] hover:text-white duration-200 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl">
          <ArrowRight2 />
        </button>
      </div>
    </div>
  );
}

export default WithReceiver(MainChat);

function EmptyChat() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <div className="relative w-[320px]">
        <div className="absolute z-[1] -top-11 -left-5">
          <div className="shadow-[0_8px_24px_0px_rgba(149,157,165,0.2)] flex items-center justify-center gap-2 bg-[#414141] px-4 py-5 rounded-2xl rounded-br-none">
            <i className="w-2 h-2 border border-[#BDBDBD] rounded-full" />
            <i className="w-2 h-2 border border-[#BDBDBD] rounded-full" />
            <i className="w-2 h-2 border border-[#BDBDBD] rounded-full" />
          </div>
          <div className="absolute -top-1.5 -right-1.5 w-full h-full border border-[#BDBDBD] px-4 py-5 rounded-2xl rounded-br-none"></div>
        </div>
        <div className="relative">
          <div className="shadow-[0_8px_24px_0px_rgba(149,157,165,0.2)] grid grid-cols-12 gap-3 bg-[#414141] px-4 py-5 rounded-2xl rounded-br-none">
            <i className="col-span-3 w-6 h-6 border border-[#BDBDBD] rounded-full" />
            <div className="col-span-9 flex flex-col items-center justify-center gap-2">
              <i className="w-full h-1 border border-[#BDBDBD] rounded-full" />
              <i className="w-full h-1 border border-[#BDBDBD] rounded-full" />
              <i className="w-full h-1 border border-[#BDBDBD] rounded-full" />
            </div>
          </div>
          <div className="absolute -bottom-1.5 -left-1.5 w-full h-full border border-[#BDBDBD] px-4 py-5 rounded-2xl rounded-br-none"></div>
        </div>
      </div>
      <div className="space-y-1 text-center">
        <p className="text-xl font-semibold text-[#BdBDBD]">
          Welcome to Message
        </p>
        <p className="font-medium text-[#414141]">Start a Conversation</p>
      </div>
    </div>
  );
}
