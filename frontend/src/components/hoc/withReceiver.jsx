//react router dom
import { useNavigate } from "react-router-dom";

export default function WithReceiver(WrappedComponent) {
  const WithReceiverComponent = (props) => {
    //navigator
    const navigate = useNavigate();

    return (
      <div>
        <p>Loading Reciver</p>
      </div>
    );
  };

  return WithReceiverComponent;
}
