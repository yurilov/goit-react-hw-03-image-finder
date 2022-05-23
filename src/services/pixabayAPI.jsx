import axios from "axios";
import settings from "./settings";

const { BASE_URL, API_KEY } = settings;

axios.defaults.baseURL = BASE_URL;

const getImages = async (q, page = 1) => {
  const response = await axios.get(
    `?q=${q}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};

export default getImages