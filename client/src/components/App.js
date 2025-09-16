 import React, { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ body: "", username: "" });
  const [error, setError] = useState(null);

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/messages");
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch messages from server.");
    }
  };

  // Send new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.username || !newMessage.body) return;

    try {
      const response = await fetch("http://127.0.0.1:5555/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const createdMessage = await response.json();
      setMessages([...messages, createdMessage]);
      setNewMessage({ body: "", username: "" });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to send message.");
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Refresh every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        border: "1px solid #ddd",
        borderRadius: "6px",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(90deg, #d81b60, #ff4081)",
          color: "white",
          padding: "0.75rem 1rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Chatterbox
        <div
          style={{
            width: "40px",
            height: "20px",
            backgroundColor: "#fff",
            borderRadius: "20px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              backgroundColor: "#000",
              borderRadius: "50%",
              position: "absolute",
              top: "1px",
              left: "2px",
            }}
          ></div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ padding: "0.5rem", borderBottom: "1px solid #ddd" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: "100%",
            padding: "0.4rem 0.6rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Messages */}
      <ul
        style={{
          listStyle: "none",
          padding: "0.5rem",
          margin: 0,
          height: "350px",
          overflowY: "auto",
          backgroundColor: "#fff",
        }}
      >
        {messages.map((msg) => (
          <li
            key={msg.id}
            style={{
              marginBottom: "0.75rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid #f1f1f1",
            }}
          >
            <strong>{msg.username}</strong>{" "}
            <span style={{ color: "#777", fontSize: "0.8rem" }}>
              {new Date(msg.created_at).toLocaleTimeString()}
            </span>
            <div style={{ marginTop: "0.3rem" }}>{msg.body}</div>
          </li>
        ))}
      </ul>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          padding: "0.5rem",
          backgroundColor: "#f9f9f9",
          gap: "0.5rem", // adds spacing between inputs and button
        }}
      >
        <input
          type="text"
          placeholder="Your name"
          value={newMessage.username}
          onChange={(e) =>
            setNewMessage({ ...newMessage, username: e.target.value })
          }
          required
          style={{
            flexGrow: 1,
            minWidth: "100px",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage.body}
          onChange={(e) =>
            setNewMessage({ ...newMessage, body: e.target.value })
          }
          required
          style={{
            flexGrow: 2,
            minWidth: "150px",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            flexShrink: 0, // prevents shrinking
            width: "80px", // fixed width
            padding: "0.5rem",
            backgroundColor: "#d81b60",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
