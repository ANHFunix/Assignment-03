import Card from "../components/UI/Card";
import "./LiveChat.css";

import avatar from "../assets/images/admin_avt.jpg";
import { useState } from "react";
import { useEffect } from "react";
import api, { call } from "../api/api";
import ChatScreen from "../components/pages/chat/ChatScreen";

const LiveChat = () => {
  // Rooms list
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currRoom, setCurrRoom] = useState(null);

  // Search
  const [ipSearch, setIpSearch] = useState("");
  const handleSearchChange = (e) => {
    setIpSearch(e.target.value);
    setFilteredRooms(rooms.filter((room) => room._id.includes(e.target.value)));
  };

  // Get all rooms
  useEffect(() => {
    call(api.room.getAll(), (data) => {
      const activeRooms = data.items.filter((room) => room.messages.length > 0);
      setRooms(activeRooms);
      setFilteredRooms(activeRooms);
    });
  }, []);

  // Render component
  return (
    <div className="live-chat px-3 py-5">
      <h5>Live chat</h5>
      <Card className="mt-4 py-3 row mx-0">
        <div className="live-chat__left col-lg-3 col-md-4 col-5">
          <input
            className="live-chat__search form-control"
            type="text"
            placeholder="Search contact . . ."
            value={ipSearch}
            onChange={handleSearchChange}
          />
          {rooms.length === 0 && <h6 className="mt-3 text-center">Hiện không có tin nhắn chờ nào</h6>}
          {filteredRooms.map((room) => (
            <div
              className={`live-chat__contact ${currRoom && room._id === currRoom._id && "active"}`}
              onClick={() => setCurrRoom(room)}
              key={room._id}
            >
              <img src={avatar} alt="avatar" />
              {room._id}
            </div>
          ))}
        </div>
        <div className="live-chat__right col-lg-9 col-md-8 col-7">
          {!currRoom && <h6 className="text-center mt-4">Vui lòng chọn 1 cuộc trò chuyện để bắt đầu</h6>}
          {currRoom && <ChatScreen room={currRoom} />}
        </div>
      </Card>
    </div>
  );
};

export default LiveChat;
