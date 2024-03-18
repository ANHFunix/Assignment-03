import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (host = "http://localhost:5000") => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const skt = io(host);
    skt.on("connect", () => skt.emit("client join room", null, "customer"));
    setSocket(skt);
  }, [host]);

  return socket;
};

export default useSocket;
