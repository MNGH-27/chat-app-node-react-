import React, { useEffect, useState } from "react";

//react router dom
import { useNavigate } from "react-router-dom";

//service
import { GetAllMessages } from "../../../../../service/message";

function ChatContainer({ roomId }) {
  //state
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  //navigate
  const navigate = useNavigate();

  //fetch chat in initial of component
  useEffect(() => {
    httpGetPrevChat();
  }, []);

  const httpGetPrevChat = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllMessages(navigate, { roomId });

      console.log("response : ", response);
    } catch (error) {
      console.log("error in get prev chat :", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-3 overflow-y-auto h-full max-h-full">
      {
        //check if fetching messages from backend
        isLoading ? (
          <LoadingChat />
        ) : //check messages length to have message
        messages.length === 0 ? (
          <EmptyChat />
        ) : (
          <></>
        )
      }
    </div>
  );
}

export default ChatContainer;

function LoadingChat() {
  return (
    <div className="space-y-5">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 h-10 bg-gray-400 animate-pulse rounded-full"></div>
        </div>
        <div className="chat-header">
          <div className="w-16 h-3 rounded-md bg-gray-400 animate-pulse mb-2"></div>
        </div>
        <div className="chat-bubble">
          <div className="w-56 h-8 rounded-md bg-gray-400 animate-pulse mb-2"></div>
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 h-10 bg-gray-400 animate-pulse rounded-full"></div>
        </div>
        <div className="chat-header">
          <div className="w-16 h-3 rounded-md bg-gray-400 animate-pulse mb-2"></div>
        </div>
        <div className="chat-bubble">
          <div className="w-80 h-10 rounded-md bg-gray-400 animate-pulse mb-2"></div>
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 h-10 bg-gray-400 animate-pulse rounded-full"></div>
        </div>
        <div className="chat-header">
          <div className="w-32 h-3 rounded-md bg-gray-400 animate-pulse mb-2"></div>
        </div>
        <div className="chat-bubble">
          <div className="w-80 h-32 rounded-md bg-gray-400 animate-pulse mb-2"></div>
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 h-10 bg-gray-400 animate-pulse rounded-full"></div>
        </div>
        <div className="chat-header">
          <div className="w-16 h-3 rounded-md bg-gray-400 animate-pulse mb-2"></div>
        </div>
        <div className="chat-bubble">
          <div className="w-80 h-10 rounded-md bg-gray-400 animate-pulse mb-2"></div>
        </div>
      </div>
    </div>
  );
}

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
