import { useParams } from "react-router-dom";

export function useToken() {
  const { token } = useParams<{ token: string }>();
  return token;
}
