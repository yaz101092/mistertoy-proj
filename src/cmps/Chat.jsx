import { useState, useEffect } from "react";

export function Chat() {
    const [msgs, setMsgs] = useState([]);
    const [msg, setMsg] = useState("");

    function handleSend() {
        if (!msg.trim()) return;

        // הוספת הודעה של המשתמש
        const newMsgs = [...msgs, { sender: "You", text: msg }];
        setMsgs(newMsgs);
        setMsg("");

        // תגובה אוטומטית אחרי שנייה
        setTimeout(() => {
            setMsgs((prevMsgs) => [
                ...prevMsgs,
                { sender: "Bot", text: "Thanks for your message!" }
            ]);
        }, 1000);
    }

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {msgs.map((m, idx) => (
                    <div key={idx} className={`chat-msg ${m.sender === "You" ? "user" : "bot"}`}>
                        <strong>{m.sender}: </strong> {m.text}
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}
