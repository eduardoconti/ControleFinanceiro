import API from "./Api";
const ENDPOINT = "auth/login";

export async function ObtemToken(body){
    try {
        const res = await API.post(ENDPOINT, body );
        return res.data.access_token
      } catch (error) {
        return 400;
      }
}