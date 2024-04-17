import React, { useState, useEffect } from "react";

const Chat = ({ socket, username, room }) => {
  const [currentmessage, setcurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentmessage !== "") {
      const messageData = {
        id: Math.random(),
        room: room,
        author: username,
        message: currentmessage,
        time:
          (new Date(Date.now()).getHours() % 12) +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setcurrentMessage("");
    }
  };

  useEffect(() => {
    const handleReceivedMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", handleReceivedMessage);
    return () => {
      socket.off("receive_message", handleReceivedMessage);
    };
  }, [socket]);
  return (
    <>
      <div className="chat_container">
        <h1>Welcome {username}</h1>
        <div className="chat_box">
          {messageList.map((data) => (
            <div
              key={data.id}
              className="message_content"
              id={username === data.author ? "you" : "other"}
            >
              <div>
                <div className="msg" id={username === data.author ? "y" : "b"}>
                  <p>{data.message}</p>
                </div>
                <div className="msg_detail">
                  <p>{data.author}</p>
                  <p>{data.time}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="chat_body">
            <input
              type="text"
              value={currentmessage}
              placeholder="type your message"
              onChange={(e) => setcurrentMessage(e.target.value)}
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage;
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
