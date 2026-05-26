/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./chat.css";
import { IoSearch } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import{ IoSend } from "react-icons/io5";
import { TiMicrophoneOutline } from "react-icons/ti";
import { BsCheck } from "react-icons/bs";
import { BsCheckAll } from "react-icons/bs";
import { BsEmojiSmileFill } from "react-icons/bs";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { IoCamera } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const socket = io("http://localhost:5000");

export default function Chat() {

  const bottomRef = useRef();
  const mediaRecorderRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [msg, setMsg] = useState("");
  const [typing, setTyping] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ================= AUTO SCROLL =================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ================= FILTER USERS =================
  useEffect(() => {
    const filtered = users.filter(userItem =>
      userItem.name.toLowerCase().includes(userSearch.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [userSearch, users]);

  // ================= LOGOUT FUNCTION =================
  const handleLogout = () => {
    localStorage.removeItem("user");
    socket.emit("logout", user?._id);
    window.location.href = "/login";
    toast.success("Logged out successfully!");
  };

  // ================= LOAD USERS =================
  useEffect(() => {
    if (!user) return;

    socket.emit("join", user._id);

    axios.get("http://localhost:5000/users").then((res) => {
      const filtered = res.data.filter((u) => u._id !== user._id);
      setUsers(filtered);
      setFilteredUsers(filtered);
      // Don't auto select any user - show welcome message instead
      setSelected(null);
    }).catch(err => console.log("Error loading users:", err));

    const fetchUnreadCounts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/unread/${user._id}`);
        setUnreadCounts(res.data);
      } catch (err) {
        console.log("Error fetching unread counts:", err);
      }
    };
    fetchUnreadCounts();

  }, []);

  // ================= LOAD CHAT =================
  useEffect(() => {
    if (!selected) return;

    axios.get(`http://localhost:5000/messages/${user._id}/${selected._id}`)
      .then((res) => {
        setMessages(res.data || []);
        socket.emit("seen", { sender: user._id, receiver: selected._id });
        setUnreadCounts(prev => {
          const newCounts = { ...prev };
          delete newCounts[selected._id];
          return newCounts;
        });
      }).catch(err => console.log("Error loading messages:", err));
  }, [selected]);

  // ================= RECEIVE MESSAGE =================
  useEffect(() => {
    const handleReceive = (data) => {
      console.log("Message received:", data);
      
      if (selected && (data.sender === selected._id || data.receiver === selected._id)) {
        setMessages((prev) => [...prev, data]);
      }
      
      if (data.sender !== user._id) {
        if (!selected || selected._id !== data.sender) {
          setUnreadCounts(prev => ({
            ...prev,
            [data.sender]: (prev[data.sender] || 0) + 1
          }));
        }
        
        setUsers(prevUsers => {
          const userIndex = prevUsers.findIndex(u => u._id === data.sender);
          if (userIndex > -1) {
            const userToMove = prevUsers[userIndex];
            const remainingUsers = prevUsers.filter(u => u._id !== data.sender);
            return [userToMove, ...remainingUsers];
          }
          return prevUsers;
        });
        
        // Show toast notification for new message
        const sender = users.find(u => u._id === data.sender);
        if (sender && !selected) {
          toast.info(`${sender.name} sent you a message!`, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    };

    socket.on("receiveMessage", handleReceive);
    
    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [selected, user?._id, users]);

  // ================= MESSAGE SEEN =================
  useEffect(() => {
    socket.on("messagesSeen", ({ senderId, receiverId }) => {
      if (receiverId === user?._id) {
        setMessages((prev) =>
          prev.map((m) =>
            m.sender === senderId ? { ...m, seen: true } : m
          )
        );
      }
    });
    return () => socket.off("messagesSeen");
  }, [user?._id]);

  // ================= ONLINE USERS =================
  useEffect(() => {
    const handleOnline = (data) => {
      setOnlineUsers(data);
    };
    socket.on("onlineUsers", handleOnline);
    return () => socket.off("onlineUsers", handleOnline);
  }, []);

  // ================= TYPING =================
  useEffect(() => {
    const handleTyping = ({ senderId, isTyping }) => {
      if (selected && senderId === selected._id) {
        setTyping(isTyping ? "Typing..." : "");
      }
    };
    socket.on("typing", handleTyping);
    return () => socket.off("typing", handleTyping);
  }, [selected]);

  // ================= GROUP MESSAGES BY DATE =================
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(msg => {
      const date = new Date(msg.createdAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let dateKey;
      if (date.toDateString() === today.toDateString()) {
        dateKey = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateKey = "Yesterday";
      } else {
        dateKey = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      }
      
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  // ================= SEND MESSAGE =================
  const send = () => {
    if (!msg.trim() || !selected) return;

    const newMessage = {
      sender: user._id,
      receiver: selected._id,
      text: msg,
      createdAt: new Date().toISOString()
    };

    setMessages((prev) => [...prev, newMessage]);
    socket.emit("sendMessage", newMessage);
    setMsg("");
    socket.emit("typing", { senderId: user._id, receiverId: selected._id, isTyping: false });
  };

  // ================= SEND IMAGE =================
  const sendImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newMessage = {
        sender: user._id,
        receiver: selected._id,
        image: reader.result,
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("sendMessage", newMessage);
      toast.success("Image sent successfully!");
    };
    reader.readAsDataURL(file);
  };

  // ================= VOICE RECORDING =================
  const startRecording = async () => {
    try {
      if (!selected) return;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "voice.webm");

        try {
          const uploadRes = await axios.post("http://localhost:5000/upload/audio", formData);
          const newMessage = {
            sender: user._id,
            receiver: selected._id,
            audio: uploadRes.data.url,
            createdAt: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, newMessage]);
          socket.emit("sendMessage", newMessage);
          toast.success("Voice message sent!");
        } catch (err) {
          console.log(err);
          toast.error("Failed to send voice message");
        }
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.info("Recording started...");
    } catch (err) {
      console.log(err);
      toast.error("Microphone access denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.info("Recording stopped");
    }
  };

  // ================= TYPING INPUT =================
  const handleTypingInput = (e) => {
    setMsg(e.target.value);
    if (selected) {
      socket.emit("typing", {
        senderId: user._id,
        receiverId: selected._id,
        isTyping: e.target.value.length > 0
      });
    }
  };

  // ================= DELETE MESSAGE =================
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/message/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success("Message deleted!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete message");
    }
  };

  // ================= DELETE CHAT WITH CONFIRMATION =================
  const confirmDeleteChat = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDeleteChat = () => {
    setShowDeleteConfirm(false);
  };

  const handleDeleteChat = async () => {
    if (!selected) return;
    try {
      await axios.put("http://localhost:5000/delete-chat", {
        sender: user._id,
        receiver: selected._id
      });
      const res = await axios.get(`http://localhost:5000/messages/${user._id}/${selected._id}`);
      setMessages(res.data);
      toast.success("Chat deleted successfully!");
      setShowDeleteConfirm(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete chat");
    }
  };

  // ================= EDIT MESSAGE =================

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const editMessage = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/message/${id}`, { text: editText });
      setMessages((prev) => prev.map((m) => m._id === id ? res.data : m));
      setEditingId(null);
      setEditText("");
      toast.success("Message edited!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to edit message");
    }
  };

  // ================= SHOW USER PROFILE =================
  const showUserProfile = (u) => {
    setSelectedUserProfile(u);
    setShowProfileModal(true);
  };

  // ================= CLOSE PROFILE =================
  const closeProfile = () => {
    setShowProfileModal(false);
    setSelectedUserProfile(null);
  };

  // ================= OPEN IMAGE MODAL =================
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  // ================= CLOSE IMAGE MODAL =================
  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  // ================= GO TO PROFILE PAGE =================
  const goToProfilePage = () => {
    window.location.href = "/profile";
  };

  // ================= UI RENDER =================
  return (
    <div className="main-chat-container">
      
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <div className="delete-confirm-icon">
              <RiDeleteBin5Fill size={50} color="#ff2e7a" />
            </div>
            <h3>Delete Chat?</h3>
            <p>Are you sure you want to delete all messages with <strong>{selected?.name}</strong>? This action cannot be undone.</p>
            <div className="delete-confirm-buttons">
              <button className="cancel-delete-btn" onClick={cancelDeleteChat}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={handleDeleteChat}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <div className="left-sidebar">
        
        {/* Logo with Logout Button */}
        <div className="logo-box">
          <span className="logo-text">ChatApp</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Top Navbar with Welcome + Username - Click to go to profile */}
        <div className="top-navbar" onClick={goToProfilePage} style={{ cursor: "pointer" }}>
          <div className="welcome-section">
            <span className="welcome-greeting">Welcome back,</span>
            <span className="user-name">{user?.name}</span>
          </div>
          <div className="user-avatar-icon">
            {user?.profilePic ? (
              <img src={user.profilePic} alt="user avatar" className="nav-avatar-img" />
            ) : (
              <div className="nav-avatar-placeholder">{user?.name?.[0]?.toUpperCase()}</div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="sidebar-search">
          <div className="search-input-wrapper">
            <span className="search-icon"><IoSearch /></span>
            <input
              type="text"
              placeholder="Search conversations..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Users List */}
        <div className="users-list">
          {filteredUsers.map((u) => (
            <div
              key={u._id}
              className={`single-user ${selected?._id === u._id ? "active-user" : ""}`}
              onClick={() => setSelected(u)}
            >
              <div className="user-left">
                <div className="avatar-container">
                  <div className="avatar" onClick={(e) => { e.stopPropagation(); showUserProfile(u); }}>
                    {u.profilePic ? (
                      <img src={u.profilePic} alt="profile" className="profile-img" />
                    ) : (
                      <span className="avatar-initial">{u.name[0]?.toUpperCase()}</span>
                    )}
                  </div>
                  <span className={`status-indicator ${onlineUsers.includes(u._id) ? "online" : "offline"}`}></span>
                </div>
                <div className="user-details">
                  <h4 className="user-name">{u.name}</h4>
                  <p className="user-status-text">
                    {onlineUsers.includes(u._id) ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
              {unreadCounts[u._id] > 0 && (
                <span className="unread-message-badge">{unreadCounts[u._id]}</span>
              )}
            </div>
          ))}
          
          {filteredUsers.length === 0 && (
            <div className="no-users-found">
              <span>No conversations found</span>
            </div>
          )}
        </div>
      </div>

      {/* CHAT SECTION */}
      <div className="chat-section">

        {/* CHAT HEADER */}
        {selected ? (
          <div className="chat-header">
            <div className="chat-user-info">
              <div className="chat-avatar" onClick={() => showUserProfile(selected)} style={{ cursor: "pointer" }}>
                {selected.profilePic ? (
                  <img src={selected.profilePic} alt="chat avatar" className="chat-profile-img" />
                ) : (
                  <span className="chat-avatar-initial">{selected.name[0]?.toUpperCase()}</span>
                )}
                <span className={`status-indicator ${onlineUsers.includes(selected._id) ? "online" : "offline"}`}></span>
              </div>
              <div className="chat-user-details" onClick={() => showUserProfile(selected)} style={{ cursor: "pointer" }}>
                <h3>{selected.name}</h3>
                <span className="user-status-badge">
                  {onlineUsers.includes(selected._id) ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            <button className="delete-chat-button" onClick={confirmDeleteChat}>
              <RiDeleteBin5Fill size={16} />  Delete Chat
            </button>
          </div>
        ) : (
          <div className="chat-header-placeholder">
            <div className="welcome-chat-placeholder">
              <div className="welcome-icon"><RiMessage2Fill /></div>
              <h3>Welcome to ChatApp</h3>
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}

        {/* MESSAGES AREA */}
        <div className="chat-messages-area">
          {selected && Object.keys(groupedMessages).length === 0 && (
            <div className="no-messages-placeholder">
              <div className="placeholder-icon"><RiMessage2Fill color="white"/></div>
              <p>No messages yet</p>
              <span>Start a conversation with {selected.name}</span>
            </div>
          )}
          
          {Object.entries(groupedMessages).map(([date, msgs]) => (
            <div key={date} className="message-date-group">
              <div className="date-separator">
                <span>{date}</span>
              </div>
              {msgs.map((m, i) => (
                <div key={i} id={`msg-${m._id}`} className={`message-bubble ${m.sender === user._id ? "message-out" : "message-in"}`}>
                  {editingId === m._id ? (
                    <div className="edit-message-container">
                      <input 
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)} 
                        className="edit-input"
                        autoFocus
                      />
                      <button onClick={() => editMessage(m._id)} className="save-edit-btn"><IoSend /></button>
                      <button onClick={cancelEdit} className="cancel-edit-btn" title="Cancel">
                          <RxCross2 size={16} />
                        </button> 
                    </div>
                  ) : (
                    <>
                      <div className="message-content-wrapper">
                        {m.text && <p className="message-text">{m.text}</p>}
                        {m.image && (
                          <img 
                            src={m.image} 
                            alt="sent" 
                            className="message-image" 
                            onClick={() => openImageModal(m.image)}
                          />
                        )}
                        {m.audio && (
                          <audio controls className="message-audio">
                            <source src={m.audio} type="audio/webm" />
                          </audio>
                        )}
                        <div className="message-meta">
                          <span className="message-time">
                            {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                          </span>
                          {m.sender === user._id && (
                            <span className="message-seen">{m.seen ? <BsCheckAll size={20}/> : <BsCheck size={20}/>}</span>
                          )}
                        </div>
                      </div>
                      
                      {m.sender === user._id && (
                        <div className="message-actions">
                          <button className="action-btn edit-btn" onClick={() => { setEditingId(m._id); setEditText(m.text); }}><CiEdit size={14}/></button>
                          <button className="action-btn delete-btn" onClick={() => deleteMessage(m._id)}><RiDeleteBin5Line size={14}/></button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        {/* TYPING INDICATOR */}
        {typing && selected && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>{typing}</span>
          </div>
        )}

        {/* INPUT AREA */}
        {selected && (
          <div className="chat-input-container">
            <div className="input-buttons">
              <button className="input-icon-btn" onClick={() => setShowEmoji(!showEmoji)}>
                <BsEmojiSmileFill />
              </button>
              {showEmoji && (
                <div className="emoji-picker-dropdown">
                  <EmojiPicker onEmojiClick={(e) => setMsg((prev) => prev + e.emoji)} />
                </div>
              )}

              <label className="input-icon-btn">
                <IoCamera />
                <input type="file" hidden accept="image/*" onChange={sendImage} />
              </label>

              <button className="input-icon-btn" onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? <BsFillRecordCircleFill /> : <TiMicrophoneOutline />}
              </button>
            </div>

            <input
              type="text"
              className="message-input"
              value={msg}
              onChange={handleTypingInput}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && send()}
            />

            <button className="send-message-btn" onClick={send}>
              <IoSend size={21}/>
            </button>
          </div>
        )}
      </div>

      {/* USER PROFILE MODAL (Right Side) */}
      {showProfileModal && selectedUserProfile && (
        <div className="user-profile-modal">
          <div className="profile-modal-content">
            <button className="close-profile-btn" onClick={closeProfile}><RxCross2 /></button>
            
            {/* Cover Image */}
            <div className="profile-modal-cover"></div>
            
            {/* Avatar */}
            <div className="profile-modal-avatar">
              {selectedUserProfile.profilePic ? (
                <img src={selectedUserProfile.profilePic} alt="profile" />
              ) : (
                <div className="modal-default-avatar">
                  {selectedUserProfile.name[0]?.toUpperCase()}
                </div>
              )}
            </div>
            
            {/* User Info */}
            <div className="profile-modal-info">
              <h2>{selectedUserProfile.name}</h2>
              <h4>{selectedUserProfile.email}</h4>
              
              {/* Bio */}
              {selectedUserProfile.bio && (
                <div className="profile-modal-bio-section">
                  <span className="bio-label">Bio</span>
                  <p className="profile-modal-bio">"{selectedUserProfile.bio}"</p>
                </div>
              )}
              
              {/* Status */}
              <div className="profile-modal-status">
                <span className={`status-dot ${onlineUsers.includes(selectedUserProfile._id) ? "online" : "offline"}`}></span>
                <span>{onlineUsers.includes(selectedUserProfile._id) ? "Online" : "Offline"}</span>
              </div>
            </div>
            
            {/* Send Message Button */}
            <button className="message-user-btn" onClick={() => {
              setSelected(selectedUserProfile);
              closeProfile();
            }}>
              Send Message
            </button>
          </div>
        </div>
      )}

      {/* IMAGE MODAL */}
      {showImageModal && selectedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-image-btn" onClick={closeImageModal}><RxCross2 /></button>
            <img src={selectedImage} alt="Full size" />
          </div>
        </div>
      )}
    </div>
  );
}