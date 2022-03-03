import endpoints from "../constants/endpoints";
import http from "../utils/http";

export function reconnect() {
  const endpoint = endpoints.GAIT_LOGGER + "/reconnect";

  return http.post(endpoint, { body: { reconnect: true } });
}
