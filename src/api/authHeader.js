import { ReactSession } from "react-client-session";
export default function authHeader() {
  const user = ReactSession.get("email");
  const token = ReactSession.get("token");

  if (user && token) {
    return { "x-access-token": token };
  } else {
    return {};
  }
}
