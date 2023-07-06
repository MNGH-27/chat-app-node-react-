import { useEffect, useState } from "react";

//react router dom
import { useNavigate } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

//service
import { CreateNewRoom, GetRoom } from "../../service/room";

//SVG
import { ReactComponent as ChatSvg } from "./../../assets/svg/Union.svg";

export default function WithReceiver(WrappedComponent) {
  const WithReceiverComponent = (props) => {
    //state
    const [room, setRoom] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    //navigation
    const navigate = useNavigate();

    //redux
    const receiver = useSelector((state) => state.receiver);

    useEffect(() => {
      //check if there is receiver
      if (receiver.id) {
        //there is receiver => send request room
        httpGetRoom();
      }
    }, [receiver]);

    //fetch both users message
    const httpGetRoom = async () => {
      setIsLoading(true);

      try {
        const response = await GetRoom(navigate, { receiverId: receiver.id });

        //check response status
        if (response.status === 200) {
          //save response.data to room state and send to chat component with props
          setRoom({
            ...response.data,
          });

          //fetch first 20 message and send with props
        } else if (response.status === 404) {
          //there is no any room create new Room
          await httpCreateNewRoom();
        }
      } catch (error) {
        console.log("error in get room : ", error);
      }
      setIsLoading(false);
    };

    const httpCreateNewRoom = async () => {
      try {
        const response = await CreateNewRoom(navigate, {
          receiverId: receiver.id,
        });

        //check response status
        if (response.status === 201) {
          //save response.data to room state and send to chat component with props
          setRoom({
            ...response.data,
          });
        }
      } catch (error) {
        console.log("error in create new room : ", error);
      }
    };

    return receiver.name.length > 0 ? (
      !isLoading && (
        <WrappedComponent {...props} receiver={receiver} room={room} />
      )
    ) : (
      <div className="col-span-2 h-full space-y-2 flex flex-col items-center justify-center border-l border-[#004CCC] ">
        <ChatSvg className="w-20" />
        <p className="text-2xl">User not selected to chat</p>
        <p className="text-sm text-gray-400">
          select user to chat from chat list or find user with add contact
        </p>
      </div>
    );
  };

  return WithReceiverComponent;
}
