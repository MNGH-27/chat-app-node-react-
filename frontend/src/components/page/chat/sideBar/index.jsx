//component
import FindUserModal from "../findUserModal";

//Svg
import { ReactComponent as ArrowRight } from "./../../../../assets/svg/arrowRight.svg";
import { ReactComponent as Plus } from "./../../../../assets/svg/plus.svg";
import { ReactComponent as Union } from "./../../../../assets/svg/Union.svg";

export default function ChatSideBar() {
  return (
    <div className="col-span-1">
      <div className="p-2 border-b border-[#004CCC] flex items-center justify-between w-full">
        <button className="bg-[#1C1F27] text-[#004CCC] hover:bg-[#004CCC] hover:text-white duration-200 px-4 py-3 rounded-xl">
          <ArrowRight />
        </button>

        <button className="bg-[#1C1F27] text-[#004CCC] hover:bg-[#004CCC] hover:text-white duration-200 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl">
          Add contact <Plus />
        </button>
      </div>

      <p className="p-2 border-b border-[#004CCC] text-center">Chats</p>

      <div className="h-full w-full flex flex-col items-center justify-center gap-2 p-2">
        <Union />
        <span className="text-xl">No direct message yet</span>
        <span className="text-[#8A898E] max-w-sm text-center">
          You will see your first direct message here when you receive it or if
          you start new chat.
        </span>
      </div>
      <FindUserModal />
    </div>
  );
}
