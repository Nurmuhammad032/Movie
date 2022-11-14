const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const baseURL = "https://api.themoviedb.org/3";

const requests = {
  fetchTv: `${baseURL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
};
// https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1
export default requests;
