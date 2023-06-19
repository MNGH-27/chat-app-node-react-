//redux
import { useDispatch } from "react-redux";

//component
import ModalWrapper from "../../../common/modalWrapper";

//SVG
import { ReactComponent as Chat } from "./../../../../assets/svg/Union.svg";

//pic
import UserPic from "./../../../../assets/images/user.png";
import { addNewReceiver } from "../../../../redux/slicer/reciever";

export default function ShowReceiverModal({ closeModalHandler, receiver }) {
  //dispatch
  const dispatch = useDispatch();

  const addReceiverToRedux = () => {
    dispatch(
      addNewReceiver({
        ...receiver,
      })
    );

    //close modal
    closeModalHandler();
  };

  return (
    <ModalWrapper
      closeModalHandler={closeModalHandler}
      modalContainer={"w-[320px] p-0"}
    >
      <div className="flex items-end justify-center bg-[#2b303d] h-[75px] rounded-t-md">
        <img
          className="w-20 h-20 rounded-full relative -bottom-5"
          src={UserPic}
          alt="user avatar"
        />
      </div>
      <div className="p-5 space-y-2">
        <p className="text-lg font-semibold">{receiver.name}</p>
        <p className="text-lg font-semibold">{receiver.email}</p>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={addReceiverToRedux}
            className="bg-[#004CCC] p-3 rounded-full border-2 border-[#004CCC] hover:bg-transparent duration-200 self-end"
          >
            <Chat className="w-5" />
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
