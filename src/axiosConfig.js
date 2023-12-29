import { axiosInstance } from "./config";

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await axiosInstance.post("/api/auth/refresh", {
      token: refreshToken,
    });
    localStorage.setItem("token", res.data.newAccessToken);
    localStorage.setItem("refreshToken", res.data.newRefreshToken);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default refreshToken;
