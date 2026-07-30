import { useState, useRef, useEffect } from "react";
import { askAI } from "../services/aiService.js";

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");

    try {
      setLoading(true);

      const reply = await askAI(currentMessage);

      setLoading(false);

      const aiMessage = {
        sender: "ai",
        text: reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
   } catch (error) {
     console.error("AI Error:", error);

     if (error.response) {
       console.log("Status:", error.response.status);
       console.log("Response:", error.response.data);
     } else {
       console.log("Message:", error.message);
     }

     setLoading(false);

     setMessages((prev) => [
       ...prev,
       {
         sender: "ai",
         text:
           error.response?.data?.message ||
           error.message ||
           "Something went wrong!",
       },
     ]);
   }};
return (
  <>
    {/* Floating Chat Button */}
    <button
      className="btn btn-primary rounded-circle shadow"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "65px",
        height: "65px",
        fontSize: "26px",
        zIndex: 9999,
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      🤖
    </button>

    {/* Chat Window */}
    {isOpen && (
      <div
        className="card shadow-lg"
        style={{
          position: "fixed",
          bottom: "80px", // 👈 Window thoda neeche
          right: "20px",
          width: "370px",
          height: "500px", // 👈 Height thodi kam
          zIndex: 9999,
          borderRadius: "15px",
        }}
      >
        {/* Header */}
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <div>
            <strong>🤖 CounselConnect AI</strong>
            <br />
            <small>Engineering Counselling Assistant</small>
          </div>

          <button
            className="btn btn-sm btn-light"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* Messages */}
        <div
          className="card-body"
          style={{
            overflowY: "auto",
            backgroundColor: "#f8f9fa",
            height: "350px",
          }}
        >
          {messages.length === 0 && (
            <div className="text-center text-muted mt-5">
              <h5>👋 Welcome!</h5>
              <p>
                Ask me anything about
                <br />
                JEE Main, JoSAA, CSAB,
                <br />
                NITs, IIITs and Engineering Admissions.
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex mb-3 ${
                msg.sender === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded shadow-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-white border"
                }`}
                style={{
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.sender === "ai" ? "🤖 " : "👤 "}
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="d-flex justify-content-start mb-3">
              <div className="bg-light border rounded p-2 shadow-sm">
                🤖 AI is typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Ask your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              className="btn btn-primary"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);}

export default AIChat;