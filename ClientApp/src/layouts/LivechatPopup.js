import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

import admin from "../assets/images/admin_avt.jpg";
import css from "./LivechatPopup.module.css";
import { toUpperFirstCase } from "../utils/string";

const Modal = ({ socket }) => {
  // Chat state
  const [messages, setMessages] = useState([
    { from: "Hệ thống", message: "Xin chào, chúng tôi có thể giúp gì được cho bạn?" },
  ]);
  const [message, setMessage] = useState("");

  // Ref of end message
  const refChatEnd = useRef();

  // Set up listener for socket
  useEffect(() => {
    if (!socket) return;
    // Handle when receive new message
    socket.on("server send message", (newMsg) => {
      if (newMsg.from === "customer") return;
      setMessages([...messages, newMsg]);
    });
  }, [messages, socket]);

  // Handle send message
  const handleSendMessage = (e) => {
    // Prevent page from reloading
    e.preventDefault();
    if (!socket) return;
    const msg = {
      from: "customer",
      message,
    };
    // Send message
    socket.emit("client send message", message);
    setMessages([...messages, msg]);
    setMessage("");
  };

  useEffect(() => refChatEnd.current.scrollIntoView({ behavior: "smooth" }), [messages]);

  // Render component
  return (
    <div className={css["livechat-modal"]}>
      <div className={css["livechat-modal__header"]}>
        <div>Customer Support</div>
        <div className="d-none d-sm-block">Let's Chat App</div>
      </div>
      <div className={css["livechat-modal__body"]}>
        {messages.map((msg, i) => {
          if (msg.from === "customer")
            return (
              <div className={css["user-message"]} key={i}>
                {msg.message}
              </div>
            );
          return (
            <div className={css["admin-message"]} key={i}>
              <img src={admin} alt="admin" />
              <div>
                {toUpperFirstCase(msg.from)}: {msg.message}
              </div>
            </div>
          );
        })}
        <div ref={refChatEnd}></div>
      </div>
      <div className={css["livechat-modal__footer"]}>
        <img src={admin} alt="admin" />
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Enter Message!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <FaPaperPlane onClick={handleSendMessage} />
        </form>
      </div>
    </div>
  );
};

const LivechatPopup = ({ socket }) => {
  return <Fragment>{createPortal(<Modal socket={socket} />, document.getElementById("overlay-root"))}</Fragment>;
};

export default LivechatPopup;
