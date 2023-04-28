import React, { useEffect } from "react";
import { socket } from "./socket";

const URL = "http://localhost:3000";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <div>hello!</div>
    </>
  );
}

export default App;
