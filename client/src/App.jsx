import React from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:2000");
const App = () => {
  return (
    <>
      <div className="join_room">
        <h1>Join Chat</h1>
        <input type="text" />
        <input type="text" />
        <button>Join</button>
      </div>
    </>
  );
};

export default App;
