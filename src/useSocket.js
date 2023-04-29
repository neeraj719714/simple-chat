import { useMemo, useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = (serverPath) => {
  const socket = useMemo(
    () =>
      io(serverPath, {
        autoConnect: false,
      }),
    [serverPath]
  );
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    return () => {
      console.log("disconnecting...");
      socket.disconnect();
    };
  }, []);
  return socket;
};

export default useSocket;
