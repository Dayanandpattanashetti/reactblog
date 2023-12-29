import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { jwtDecode } from "jwt-decode";
import refreshToken from "../../axiosConfig";
import { axiosInstance } from "../../config";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);

  const PF = "https://mernblog-ykbt.onrender.com/images/";

  useEffect(() => {
    setUsername(user.username || "");
    setEmail(user.email || "");
  }, [user]);

  const axiosJWT = axiosInstance.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.newAccessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosJWT.delete("/api/user/" + user._id, {
        headers: { authorization: "Bearer " + token },
      });
      dispatch({ type: "LOGOUT" });
      setSuccess(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
    };
    if (password) {
      updatedUser.password = password;
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axiosInstance.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axiosJWT.put("/api/user/" + user._id, updatedUser, {
        headers: { authorization: "Bearer " + token },
      });
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <span className="settingsUpdateTitle">Update Your Account</span>

        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePic
                  ? PF + user.profilePic
                  : "https://mernblog-ykbt.onrender.com/images/user.png"
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="settingsBtn">
            <button className="settingsSubmit" type="submit">
              Update
            </button>
            <span className="settingsDelete" onClick={handleDelete}>
              Delete Account
            </span>
          </div>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
