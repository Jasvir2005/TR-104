import React, { useState } from "react";
import "./profile.css";
import axios from "axios";
import { IoCamera } from "react-icons/io5";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [image, setImage] = useState(user?.image || user?.profilePic || "");
  const [isLoading, setIsLoading] = useState(false);
  

  // IMAGE CHANGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      const updatedUser = {
        ...user,
        image: reader.result,
        profilePic: reader.result,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    };
    reader.readAsDataURL(file);
  };

  // SAVE PROFILE
  const saveProfile = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(`http://localhost:5000/update-profile/${user._id}`, {
        name,
        bio,
        profilePic: image,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile Updated Successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        
        {/* Header */}
        <div className="profile-header">
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back to Chat
          </button>
          <h1>Profile Settings</h1>
          <div className="placeholder"></div>
        </div>

        {/* Main Profile Card - Horizontal Layout */}
        <div className="profile-card">
          
          {/* Left Side - Profile Image with Name & Email */}
          <div className="profile-left">
            <div className="left-content">
              <div className="avatar-container">
                {image ? (
                  <img src={image} alt="Profile" className="profile-avatar" />
                ) : (
                  <div className="default-avatar">
                    {name ? name[0].toUpperCase() : "U"}
                  </div>
                )}
                <label className="edit-photo-btn">
                  <span className="camera-icon"><IoCamera /></span>
                  <input type="file" hidden accept="image/*" onChange={handleImage} />
                </label>
              </div>
              
              {/* User Info Below Image */}
              <div className="left-user-info">
                <h3>{name || "User"}</h3>
                <p>{user?.email}</p>
                {bio && <span className="left-bio">{bio}</span>}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="profile-right">
            <div className="edit-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write something about yourself..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={user?.email || ""} disabled />
              </div>

              <button className="save-btn" onClick={saveProfile} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}