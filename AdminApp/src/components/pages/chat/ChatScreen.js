import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";

import admin from "../../../assets/images/admin_avt.jpg";
import useSocket from "../../../hooks/useSocket";
import { toUpperFirstCase } from "../../../utils/string";
import "./ChatScreen.css";

const ChatScreen = ({ room }) => {
  // Chat state
  const [messages, setMessages] = useState(room.messages);
  const [message, setMessage] = useState("");

  // Ref of end message
  const refChatEnd = useRef();

  // Init socket
  const user = useSelector((state) => state.user.user);
  const socket = useSocket(room._id, user.role);

  // Set up listener for socket
  useEffect(() => {
    if (!socket) return;
    // Handle when receive new message
    socket.on("server send message", (newMsg) => {
      if (newMsg.from !== "customer") return;
      setMessages([...messages, newMsg]);
    });
  }, [messages, socket]);

  // Handle send message
  const handleSendMessage = (e) => {
    // Prevent page from reloading
    e.preventDefault();
    if (!socket) return;
    const msg = {
      from: user.role,
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
    <div className="chat-screen">
      <div className="chat-screen__body">
        {messages.map((msg, i) => {
          if (msg.from !== "customer")
            return (
              <div className="user-message" key={i}>
                {msg.message}
              </div>
            );
          return (
            <div className="admin-message" key={i}>
              <img src={admin} alt="admin" />
              <div>
                {toUpperFirstCase(msg.from)}: {msg.message}
              </div>
            </div>
          );
        })}
        <div ref={refChatEnd}></div>
      </div>
      <div className="chat-screen__footer">
        <img src={admin} alt="admin" />
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            className="form-control"
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

export default ChatScreen;
