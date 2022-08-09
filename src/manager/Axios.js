// import Axios from 'axios';
// import GV from '../utils/GV';

// Axios.interceptors.request.use(
//     config => {
//         try {
//                 config.headers['Authorization'] = 'Bearer ' + authToken;
//         }
//         catch (error) {
//             console.log("[axios].request.catch.error", error)
//         }
//         finally {
//             // console.log("[axios].config", config)
//             return config;
//         }

//     },
//     error => {
//         console.log("[Axios.Request.Error]", JSON.stringify(error))
//         return Promise.reject(error.response ? error.request : error)
//     });

// Axios.interceptors.response.use(
//     async (response) => {
//         try {
//         }
//         catch (error) {
//             console.log("[axios].response.catch.error", error)
//         }
//         finally {
//             return response
//         }
//     },
//     async (error) => {
//         try {
//             console.log("[Axios.Reponse.Error]", JSON.stringify(error.response ? error.response : error))
//             // if (error?.response?.status === 400) Toast.error('Bad Request!');
//             // else if (error?.response?.status === 404) Toast.error('Bad Request!');
//             // if (error.message) Toast.error(error.message);
//             if (error?.response?.status === 500 || error?.response?.status === 404) alert('Something went wrong!');
//             // if (error.config.metadata) {
//             //     // Request failed, e.g. HTTP code 500

//             //     const { httpMetric, trace } = error.config.metadata;

//             //     // add any extra metric attributes if needed
//             //     // httpMetric.putAttribute('userId', '12345678');

//             //     httpMetric.setHttpResponseCode(error.response.status);
//             //     httpMetric.setResponseContentType(error.response.headers['content-type']);
//             //     await httpMetric.stop();
//             //     await trace.stop();
//             // }
//         } catch (error) {
//             console.log("[axios].response.error.catch.error", error)

//         } finally {
//             return Promise.reject(error.response ? error.response : error);
//         }
//     });
// export default Axios;
