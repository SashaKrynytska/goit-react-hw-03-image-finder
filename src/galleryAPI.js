import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31497711-5e6e9dab33a5e06d4ffb7193a';

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

export default fetchImages;
