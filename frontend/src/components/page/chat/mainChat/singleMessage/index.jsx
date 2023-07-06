import React from "react";

//moment
import moment from "moment-jalaali";

function SingleMessage({ userId, message }) {
  moment.loadPersian({ usePersianDigits: false });

  return (
    <div
      className={`chat ${
        userId === message.senderId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">
          {moment(message.createAt).format("hh : mm")}
        </time>
      </div>
      <div className="chat-bubble">{message.text}</div>
    </div>
  );
}

export default SingleMessage;
