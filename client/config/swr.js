import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const swrConfig = {
  fetcher: (url) => axios.get(url, { baseURL: "/api" }).then((res) => res.data),
};
