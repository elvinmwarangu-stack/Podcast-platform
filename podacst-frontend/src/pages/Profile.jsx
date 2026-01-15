import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usersApi } from "../api/users";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    full_name: user?.full_name || "",
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(user?.profile_photo || "");
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const [message, setMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    console.log('User profile_photo from context:', user?.profile_photo ? 'Photo exists' : 'No photo');
    if (user?.profile_photo) {
      setProfilePhoto(user.profile_photo);
    }
  }, [user?.profile_photo]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Saving profile photo:', profilePhoto ? 'Photo exists' : 'No photo');
      const updatedUser = await usersApi.updateMe({ ...formData, profile_photo: profilePhoto });
      console.log('Updated user:', updatedUser);
      updateUser(updatedUser);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error('Update error:', err);
      setMessage("Error updating profile");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await usersApi.resetPassword(passwordData);
      setPasswordMessage("Password updated successfully!");
      setPasswordData({ current_password: "", new_password: "" });
    } catch (err) {
      setPasswordMessage(err.message || "Error updating password");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      alert("Camera access denied");
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    setProfilePhoto(canvas.toDataURL('image/jpeg'));
    stopCamera();
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-white">My Profile</h1>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-700 mb-4 overflow-hidden">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-gray-500">👤</div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
            >
              Upload Photo
            </button>
            <button
              onClick={startCamera}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
            >
              Take Photo
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {showCamera && (
          <div className="mb-6 text-center">
            <video ref={videoRef} autoPlay className="w-full max-w-md mx-auto rounded mb-2" />
            <div className="flex gap-2 justify-center">
              <button onClick={capturePhoto} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Capture
              </button>
              <button onClick={stopCamera} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-400">Username</p>
          <p className="text-xl font-semibold text-white">{user.username}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && <div className="text-green-400">{message}</div>}
          
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          
          <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
            Update Profile
          </button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Change Password</h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          {passwordMessage && (
            <div className={passwordMessage.includes("success") ? "text-green-400" : "text-red-400"}>
              {passwordMessage}
            </div>
          )}
          
          <div>
            <label className="block text-gray-300 mb-2">Current Password</label>
            <input
              type="password"
              value={passwordData.current_password}
              onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={passwordData.new_password}
              onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              minLength="8"
              required
            />
          </div>
          
          <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
            Change Password
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 mb-2">Member since: {new Date(user.created_at).toLocaleDateString()}</p>
          <button onClick={logout} className="text-red-400 hover:underline">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
