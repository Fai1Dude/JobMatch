import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { MdKeyboardVoice } from "react-icons/md";
import { MdGroups } from "react-icons/md"; // For multiple recipients
import { IoPerson } from "react-icons/io5"; // For a single recipient
import './Message.css';

const SearchBar = () => (
  <div className="search-bar">
    <div style={{ display: "flex", width: "516px", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", padding: "4px 8px" }}>
      <FaSearch style={{ marginRight: "8px", color: "#99A2AD" }} />
      <input
        type="text" placeholder="Search messages"
        style={{ border: "none", outline: "none", flex: 1 }}
      />
    </div>
    <LuSettings2 id='set' style={{ marginRight: "8px", color: "#0A66C2" }} />
  </div>
);

const MessageCard = ({ name, message, time, recipients }) => {
  // Determine which avatar to show based on the number of recipients
  const AvatarIcon = recipients.length > 1 ? MdGroups : IoPerson;

  return (
    <div className="message-card">
      <div className="avatar">
        <AvatarIcon size={24} />
      </div>
      <div className="message-info">
        <h4>{name}</h4>
        <p>{message}</p>
      </div>
      <div className="message-time">{time}</div>
    </div>
  );
};

const MessageList = ({ messages }) => (
  <div className="message-list">
    {messages.map((msg, index) => (
      <MessageCard 
        key={index} 
        name={msg.name} 
        message={msg.message} 
        time={msg.time} 
        recipients={msg.recipients}  // Pass recipients to MessageCard
      />
    ))}
  </div>
);

const RecipientInput = ({ recipients, selectedRecipients, toggleRecipient }) => (
  <div className="recipient-input">
    <div className="to-label">To:</div>
    <div className="recipient-list">
      {recipients.map((recipient, index) => (
        <button
          key={index}
          className={`recipient-bubble ${selectedRecipients.includes(recipient) ? 'selected' : ''}`}
          onClick={() => toggleRecipient(recipient)}
        >
          {recipient}
        </button>
      ))}
    </div>
  </div>
);

const MessageInput = ({ onSendMessage, recipients }) => {
  const [message, setMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() && selectedRecipients.length > 0) {
      selectedRecipients.forEach((recipient) => {
        onSendMessage(recipient, message);
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleRecipient = (recipient) => {
    setSelectedRecipients((prev) => 
      prev.includes(recipient) 
        ? prev.filter((r) => r !== recipient) 
        : [...prev, recipient]
    );
  };

  return (
    <div className="message-input-container">
      <RecipientInput 
        recipients={recipients} 
        selectedRecipients={selectedRecipients} 
        toggleRecipient={toggleRecipient} 
      />
      <div className="message-input">
        <button>➕</button>
        <input
          type="text"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <MdKeyboardVoice id='voice' style={{ marginRight: "8px", color: "#0A66C2" }} />
      </div>
    </div>
  );
};

const Message = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([
    { name: "Mohamed", message: "You: Hello", time: "11:11 AM", recipients: ["Mohamed"] },
    { name: "MICROSOFT", message: "You: Your message", time: "11:11 AM", recipients: ["MICROSOFT"] },
    { name: "Sponsor", message: "Sponsor - Sponsored message", time: "11:11 AM", recipients: ["Sponsor"] },
    { name: "Raid,Mohmmed,Abduallah", message: "You sent a post", time: "11:11 AM", recipients: ["Raid", "Mohmmed", "Abduallah"] },
    { name: "Ahmed", message: "You: Voice message", time: "11:11 AM", recipients: ["Ahmed"] },
  ]);

  const recipients = ["STC", "Osama", "ARAMCO", "Sara", "Zain"];

  const addMessage = (recipient, message) => {
    setMessages([...messages, { name: recipient, message: `You: ${message}`, time: "Now", recipients: [recipient] }]);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };

  return (
    <div className="message-container">
      <div className="left-message">
        <SearchBar />
        <MessageList messages={messages} />
      </div>
      <div className="right-message">
        <MessageInput onSendMessage={addMessage} recipients={recipients} />
      </div>
    </div>
  );
};

export default Message;
