import axios from "axios";
export default axios.create({
  baseURL: `https://prod-global-webapp-proxy.nubank.com.br/api/proxy/`,
});
