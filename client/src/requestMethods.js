import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjM2MzJkOTI5NzlmMjZmZTU1YTMwZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTk4OTQ4OSwiZXhwIjoxNjU2NTk0Mjg5fQ.kwhatquK5iOrlFBSqyDM2ct36PntiJpVJJ_abBgw7os";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${Token}` },
});
