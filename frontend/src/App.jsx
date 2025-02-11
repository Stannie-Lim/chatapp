import { useEffect, useState } from "react";
import io from "socket.io-client";

import "./App.css";

// this sends a 'connection' request to your socket io server
// you sent a connection request
// but your backend is not listening to any connection requests yet
const socket = io("https://stanniechatappbackend.onrender.com");

function App() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("allMessages", (data) => {
      setMessages(data);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    // emit an event to the socket server
    // the event name
    // data that you want to pass thru
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button>Send message</button>
      </form>
    </>
  );
}

export default App;
