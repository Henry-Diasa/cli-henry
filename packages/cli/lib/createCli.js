import path from "node:path";
import fse from "fs-extra";
import { dirname } from "dirname-filename-esm";
import { program } from "commander";
import semver from "semver";
import chalk from "chalk";
import { log } from "@cli-henry/utils";
const LOWEST_NODE_VERSION = "14.0.0";

const __dirname = dirname(import.meta);
const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = fse.readJSONSync(pkgPath);
function checkNodeVersion() {
  log.verbose("node version", process.version);
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(
      chalk.red(`cli-henry 需要安装至少${LOWEST_NODE_VERSION} 版本的Node.js`)
    );
  }
}
function preAction() {
  // 检查Node版本
  checkNodeVersion();
}
export default function () {
  log.info("version", pkg.version);
  program
    .name(Object.keys(pkg.bin)[0])
    .usage("<command> [options]")
    .version(pkg.version)
    .option("-d, --debug", "是否开启调试", false)
    .hook("preAction", preAction);
  // 未知命令提示
  program.on("command:*", function (obj) {
    log.error("未知的命令：" + obj[0]);
  });
  // debug模式
  program.on("option:debug", function () {
    if (program.opts().debug) {
      log.verbose("debug", "launch debug mode");
    }
  });
  return program;
}
