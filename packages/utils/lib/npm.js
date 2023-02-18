import axios from "axios";
import urlJoin from "url-join";
import log from "./log.js";
function getNpmInfo(npmName) {
  const registry = "https://registry.npmjs.org/";
  const url = urlJoin(registry, npmName);
  return axios.get(url).then((r) => {
    try {
      return r.data;
    } catch (error) {
      return Promise.reject(error);
    }
  });
}
export function getLatestVersion(npmName) {
  return getNpmInfo(npmName).then((data) => {
    if (!data["dist-tags"] || !data["dist-tags"].latest) {
      log.error("没有latest版本号");
      return Promise.reject("没有最新的版本");
    }
    return data["dist-tags"].latest;
  });
}
