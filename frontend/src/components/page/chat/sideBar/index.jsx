import { useState } from "react";

//component
import FindUserModal from "../findUserModal";

//Svg
import { ReactComponent as ArrowRight } from "./../../../../assets/svg/arrowRight.svg";
import { ReactComponent as Plus } from "./../../../../assets/svg/plus.svg";
import { ReactComponent as Union } from "./../../../../assets/svg/Union.svg";
import ShowReceiverModal from "../showReceiverModal";

export default function ChatSideBar() {
  const [receiver, setReceiver] = useState({});
  const [isShowFindUserModal, setIsShowFindUserModal] = useState(false);

  const onCloseModalHandler = (reqCondition = false, receiver) => {
    //check if reqCondition = false
    if (!reqCondition) {
      //close modal
      setIsShowFindUserModal(false);
      return;
    }

    //set receiver
    setReceiver(receiver);
    setIsShowFindUserModal(false);
  };

  return (
    <>
      <div className="col-span-1">
        <div className="p-2 border-b border-[#004CCC] flex items-center justify-between w-full">
          <button className="bg-[#1C1F27] text-[#004CCC] hover:bg-[#004CCC] hover:text-white duration-200 px-4 py-3 rounded-xl">
            <ArrowRight />
          </button>

          <button
            onClick={() => setIsShowFindUserModal(true)}
            className="bg-[#1C1F27] text-[#004CCC] hover:bg-[#004CCC] hover:text-white duration-200 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl"
          >
            Add contact <Plus />
          </button>
        </div>

        <p className="p-2 border-b border-[#004CCC] text-center">Chats</p>

        <div className="h-full w-full flex flex-col items-center justify-center gap-2 p-2">
          <Union className="w-10" />
          <span className="text-xl">No direct message yet</span>
          <span className="text-[#8A898E] max-w-sm text-center">
            You will see your first direct message here when you receive it or
            if you start new chat.
          </span>
        </div>
      </div>

      {
        //modal for find user to text
        isShowFindUserModal && (
          <FindUserModal closeModalHandler={onCloseModalHandler} />
        )
      }
      {
        //modal after user found (show detail of user and option to text user)
        receiver?.name && (
          <ShowReceiverModal
            closeModalHandler={() => {
              setReceiver({});
            }}
            receiver={receiver}
          />
        )
      }
    </>
  );
}
