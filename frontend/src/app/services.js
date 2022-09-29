import axios from "axios";

const axiosService = {
  config: {
    headers: {
      "Content-Type": "application/json",
    },
  },
  getUrl: function (url) {
    let baseurl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
    let version = "/api/v1/";
    return baseurl + version + url;
  },
  get: async function (url) {
    let apiurl = this.getUrl(url);
    return await axios.get(apiurl, this.config);
  },
  post: async function (url, data) {
    let apiurl = this.getUrl(url);
    return await axios.post(apiurl, data, this.config);
  },
  delete: async function (url) {
    let apiurl = this.getUrl(url);
    return await axios.delete(apiurl, this.config);
  },
  put: async function (url, data) {
    let apiurl = this.getUrl(url);
    return await axios.put(apiurl, data, this.config);
  },
  patch: async function (url, data) {
    let apiurl = this.getUrl(url);
    return await axios.patch(apiurl, data, this.config);
  },
};

export default axiosService;
