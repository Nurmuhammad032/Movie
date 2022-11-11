import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
  },
});

interface Data {
  data: {
    expires_at: string;
    request_token: string;
    success: boolean;
  };
}

export const getToken = async () => {
  try {
    const { data }: Data = await api.get("/authentication/token/new");
    const token = data.request_token;

    if (data.success) {
      localStorage.setItem("request_token", token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log(error);
  }
};



export const createSessiodId = async () => {
  const token = localStorage.getItem("request_token");

  if (token) {
    try {
      const {
        data: { session_id },
      } = await api.post("authentication/session/new", {
        request_token: token,
      });
      localStorage.setItem("session_id", session_id);

      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
};
