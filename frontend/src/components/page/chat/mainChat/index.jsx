//HOC
import WithReceiver from "../../../hoc/withReceiver";

//Svg
import { ReactComponent as ArrowRight2 } from "./../../../../assets/svg/arrowRight(2).svg";

function MainChat({ receiver }) {
  return (
    <div className="col-span-2 flex flex-col border-l border-[#004CCC]">
      <div className="p-3 border-b border-[#004CCC] flex items-center justify-between w-full">
        <span className="text-xl">{receiver.name}</span>
        <span className="text-sm text-[#8A898E]">last seen recently</span>
      </div>

      <div className="h-full p-3">this is chat</div>

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
