import path from "node:path";
import { pathExistsSync } from "path-exists";
import fse from "fs-extra";
import ora from "ora";
import { execa } from "execa";
import { log } from "@cli-henry/utils";

function getCacheDir(targetPath) {
  return path.resolve(targetPath, "node_modules");
}
function makeCacheDir(targetPath) {
  const cacheDir = getCacheDir(targetPath);
  if (!pathExistsSync(cacheDir)) {
    fse.mkdirpSync(cacheDir);
  }
}
async function downloadAddTemplate(targetPath, selectedTemplate) {
  const { npmName, version } = selectedTemplate;
  const installCommand = "npm";
  const installArgs = ["install", `${npmName}@${version}`];
  const cwd = targetPath;
  log.verbose("installArgs", installArgs);
  log.verbose("cwd", cwd);
  const subProcess = execa(installCommand, installArgs, { cwd });
  await subProcess;
}
export default async function (selectedTemplate) {
  const { targetPath, template } = selectedTemplate;
  makeCacheDir(targetPath);
  const spinner = ora("正在下载模板...").start();
  try {
    await downloadAddTemplate(targetPath, template);
    log.success("下载模板成功");
    spinner.stop();
  } catch (error) {
    spinner.stop();
    log.error("下载模板失败");
  }
}
