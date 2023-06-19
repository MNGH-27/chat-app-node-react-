import { useState } from "react";

//react toastify
import { toast } from "react-toastify";

//react router dom
import { useNavigate } from "react-router-dom";

//redux
import { useSelector } from "react-redux";
//services
import { GetReceiver } from "../../../../service/user";

//component
import ChatAppInput from "../../../util/input";
import ChatAppButton from "../../../util/button";
import ModalWrapper from "../../../common/modalWrapper";

export default function FindUserModal({ closeModalHandler }) {
  //redux
  const user = useSelector((state) => state.user);

  //navigate
  const navigate = useNavigate();

  //data
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const onSetDataSchemaHandler = (target, value) => {
    //check value if be equal to current user
    if (value === user.name) {
      setError("you can't message to your self");
    } else {
      //clear error
      setError("");
    }

    setName(value);
  };

  const httpFindUser = async () => {
    //check value if be equal to current user
    if (name === user.name) {
      setError("you can't message to your self");
      return;
    }

    setIsBtnLoading(true);
    try {
      const response = await GetReceiver(navigate, { name });

      if (response.status === 200) {
        closeModalHandler(true, response.data);
      } else {
        //error code is 400
        if (typeof response.data.message === "string") {
          //error is just a message show in toast error
          toast.error(response.data.message);
        } else {
          //error is for input show under input field
          setError(response.data.message.name);
        }
      }
    } catch (error) {
      console.log("error in finding user => : ", error);
    }

    setIsBtnLoading(false);
  };

  return (
    <ModalWrapper
      closeModalHandler={closeModalHandler}
      modalContainer={"w-[320px]"}
    >
      <p className="text-xl font-semibold mb-2">finding user</p>
      <ChatAppInput
        inputClass={"rounded-md"}
        type={"text"}
        value={name}
        onChangeDataHandler={onSetDataSchemaHandler}
        title={"username"}
        placeholder={"for ex : mngh-27"}
        error={error}
      />

      <ChatAppButton
        btnContainerClass={"rounded-md"}
        clickHandler={httpFindUser}
        isLoading={isBtnLoading}
        bgColor={"#004CCC"}
        textColor={"#fff"}
      >
        find
      </ChatAppButton>
    </ModalWrapper>
  );
}
