import { log, isDebug } from "@cli-henry/utils";

function printError(type, e) {
  if (isDebug()) {
    log.error(type, e);
  } else {
    log.error(type, e.message);
  }
}
export default function () {
  process.on("uncaughtException", (e) => printError("Common Error ", e));

  process.on("unhandledRejection", (e) => printError("Promise Error ", e));
}
