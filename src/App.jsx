import React, { useEffect, useState } from "react";
import useSocket from "./useSocket";

const URL = import.meta.env.ENDPOINT || "http://localhost:3000";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useSocket(URL);

  useEffect(() => {
    if (!socket) return;
    console.log("useEffect");
    socket.connect();
    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const onSubmitClick = () => {
    socket.emit("message", message);
    setMessage("");
  };
  return (
    <div>
      {messages.map((message) => (
        <div>{message}</div>
      ))}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="button" onClick={onSubmitClick}>
        Send
      </button>
    </div>
  );
}

export default App;
