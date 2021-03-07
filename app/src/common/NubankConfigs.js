import axios from "axios";
export const API_NUBANK = axios.create({
  baseURL: `https://prod-global-webapp-proxy.nubank.com.br/api/proxy/`,
});

export const TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMTUtMTItMDRUMTc6MzY6MjIuNjY0LXU5ZC1ldWN1Ri1zQUFBRlJiaER3aUEifQ.eyJhdWQiOiJvdGhlci5jb250YSIsInN1YiI6IjVkMmIzMDVmLWNkYTMtNDM3MC1iMTk5LWJkMzg1ZmI3NGQ2YiIsImlzcyI6Imh0dHBzOlwvXC93d3cubnViYW5rLmNvbS5iciIsImV4cCI6MTYxNDg5ODUxNCwic2NvcGUiOiJhdXRoXC91c2VyIHVzZXIiLCJqdGkiOiJmZE9nYTZzbmVSNEFBQUYzMjJkR29nIiwiYWNsIjpudWxsLCJ2ZXJzaW9uIjoiMiIsImlhdCI6MTYxNDI5MzcxNH0.v22S6XKq-VwYA6wQUHZH-6Hr6f0iu4ftDASjMeEOt1rORHxcAw9dusRPcvDPW0kLYkgl7V2MDjJbEGO2YxVcTezMaCed7fKJ_hn__YAfPwdFy-0MeCySar71LCOdKvybrLwxuWWV3PaoWqU7FnbHT-2V781xKENehvL-T7aZtfseun6zRKAheB0auDZmOcCycGqsODYOFKyYwruTVh7vJDfS78lwh_PIAZYBMXs38PYDyzfHZRQk-1_XN1hDBzfUc8hxrpEZbcpw7YAWGfPq3B_gK3BWL3rtzIHVQmyTEbZWCVuLyUQhA4Jw2pP1tX71wMR_cfhkKlhETqBIb2Um1g";
export const ENDPOINT_DADOS_USUARIO =
  "AJxL5LBemddSfMAj0tHac2S3CfWCDUyLww.aHR0cHM6Ly9wcm9kLXM5LWN1c3RvbWVycy5udWJhbmsuY29tLmJyL2FwaS9jdXN0b21lcnMvNWQyYjMwNWYtY2RhMy00MzcwLWIxOTktYmQzODVmYjc0ZDZi";

export async function getNubank() {
  let res;
  res = await API_NUBANK.get(ENDPOINT_DADOS_USUARIO, {
    headers: { Authorization: "Bearer " + TOKEN },
  });
  return res.data;
}
