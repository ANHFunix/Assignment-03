import { Fragment, useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";

import LivechatPopup from "./LivechatPopup";
import css from "./Livechat.module.css";
import useSocket from "../hooks/useSocket";

const Livechat = () => {
  // Show popup state
  const [isShowPopup, setIsShowPopup] = useState(false);

  // Toggle popup handler
  const togglePopupHandler = () => {
    setIsShowPopup((state) => !state);
  };

  // Init socket
  const socket = useSocket();

  // Render component
  return (
    <Fragment>
      <div className={css["livechat"]} onClick={togglePopupHandler}>
        <FaFacebookMessenger />
      </div>
      {isShowPopup && <LivechatPopup socket={socket} />}
    </Fragment>
  );
};

export default Livechat;
