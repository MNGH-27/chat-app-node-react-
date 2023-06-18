import { useState } from "react";

//component
import ChatAppInput from "../../../util/input";
import ChatAppButton from "../../../util/button";

export default function FindUserModal() {
  const [name, setName] = useState("");

  const onSetDataSchemaHandler = (target, value) => {
    setName(value);
  };

  const httpFindUser = async () => {
    try {
    } catch (error) {
      console.log("error in finding user => : ", error);
    }
  };

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-[#1C1F27]/70 flex items-center justify-center">
      <div className="flex flex-col gap-5 bg-[#1C1F27] w-[320px] p-5 rounded-md border border-[#004CCC]">
        <p className="text-xl font-semibold mb-2">finding user</p>
        <ChatAppInput
          inputClass={"rounded-md"}
          type={"text"}
          value={name}
          onChangeDataHandler={onSetDataSchemaHandler}
          title={"username"}
          placeholder={"for ex : mngh-27"}
        />
        <ChatAppButton
          btnContainerClass={"rounded-md"}
          clickHandler={httpFindUser}
          bgColor={"#004CCC"}
          textColor={"#fff"}
        >
          find
        </ChatAppButton>
      </div>
    </div>
  );
}
