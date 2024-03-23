import ApiClient from '@/configs/ApiClient';
import { END_POINT } from '@/constants';

// const END_POINT = 'http://localhost:8080/api';

const api = new ApiClient(END_POINT).getInstance();

export default api;
