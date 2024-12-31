import axios from 'axios';
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});
export default api;



// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
// });





// import axios from "axios";
//
// const api = axios.create({
//   paramsSerializer: (params) => {
//     return qs.stringify(params, {arrayFormat: "repeat"});
//   },
//   headers: {
//     "X-Requested-With": "XMLHttpRequest",
//     "Content-Type": "application/json",
//   },
//   baseURL:'http://127.0.0.1:8000/api',
//
//
// });


