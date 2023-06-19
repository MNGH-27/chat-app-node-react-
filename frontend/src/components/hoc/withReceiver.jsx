//redux
import { useSelector } from "react-redux";

//SVG
import { ReactComponent as Chat } from "./../../assets/svg/Union.svg";

export default function WithReceiver(WrappedComponent) {
  const WithReceiverComponent = (props) => {
    //redux
    const receiver = useSelector((state) => state.receiver);

    return receiver.name.length > 0 ? (
      <WrappedComponent {...props} receiver={receiver} />
    ) : (
      <div className="col-span-2 h-full space-y-2 flex flex-col items-center justify-center border-l border-[#004CCC] ">
        <Chat className="w-20" />
        <p className="text-2xl">User not selected to chat</p>
        <p className="text-sm text-gray-400">
          select user to chat from chat list or find user with add contact
        </p>
      </div>
    );
  };

  return WithReceiverComponent;
}
