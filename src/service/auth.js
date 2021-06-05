import axios from 'axios';

import { API_END_POINT_URL } from '../util';

export const signUpApi = payload => axios.post(`${API_END_POINT_URL}api/signUp`, payload);
