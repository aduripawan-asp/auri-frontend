import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://auri-backend-94u4.onrender.com");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", {
        sender: username,
        content: message
      });
      setMessage("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Auri Chat</h2>

      <input
        placeholder="Your name"
        onChange={(e) => setUsername(e.target.value)}
      />

      <div style={{ border: "1px solid gray", height: 300, overflow: "auto", marginTop: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
