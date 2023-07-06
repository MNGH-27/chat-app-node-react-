import { useEffect, useState } from "react";

//component
import ChatContainer from "./chatContainer";
//HOC
import WithReceiver from "../../../hoc/withReceiver";

//Svg
import { ReactComponent as ArrowRight2 } from "./../../../../assets/svg/arrowRight(2).svg";

//socket-io
import io from "socket.io-client";
import { toast } from "react-toastify";

const socket = io.connect("http://localhost:5000");

function MainChat({ user, receiver, room }) {
  const [message, setMessage] = useState("");
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  //join room in mount component
  useEffect(() => {
    //join to room in socket io with room id
    socket.emit("joinRoom", room.id);
  }, []);

  //messageResponse Handler
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setIsBtnLoading(false);
      // console.log("received response:", data.message);
    });
  }, [socket]);

  const onSendMessageHandler = () => {
    setIsBtnLoading(true);

    //check if there is message
    if (message.trim().length === 0) {
      toast.error("message can't be empty");
      return;
    }

    //send message with new message
    socket.emit("newMessage", {
      roomId: room.id,
      senderId: user.id,
      receiverId: receiver.id,
      message,
    });

    //clear message
    setMessage("");
  };

  return (
    <div className="col-span-2 flex flex-col border-l border-[#004CCC] h-screen">
      <div className="p-3 border-b border-[#004CCC] flex items-center justify-between w-full">
        <span className="text-xl">{receiver.name}</span>
        <span className="text-sm text-[#8A898E]">last seen recently</span>
      </div>

      <ChatContainer socket={socket} userId={user.id} roomId={room.id} />

      <div className="p-2 border-t border-[#004CCC] flex items-center justify-between gap-3 w-full h-fit">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-[#0C0E12] h-[65px] resize-none outline-none rounded-md placeholder:text-[#43527C] p-2"
          placeholder="Say something"
        />
        {isBtnLoading ? (
          <p> button is loading </p>
        ) : (
          <button
            onClick={onSendMessageHandler}
            className="bg-[#1C1F27] text-[#004CCC] hover:bg-[#004CCC] hover:text-white duration-200 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl"
          >
            <ArrowRight2 />
          </button>
        )}
      </div>
    </div>
  );
}

export default WithReceiver(MainChat);
