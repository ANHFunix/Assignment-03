import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (roomId, role = "admin", host = "http://localhost:5000") => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const skt = io(host);
    skt.on("connect", () => skt.emit("client join room", roomId, role));
    setSocket(skt);
  }, [host, role, roomId]);

  return socket;
};

export default useSocket;
